import {
  Injectable,
  InternalServerErrorException,
  PreconditionFailedException,
} from '@nestjs/common';
import { RepoService } from '../repositories';
import {
  Credentials,
  Notification,
  NotificationDevice,
  NotificationSent,
  NotificationTemplate,
} from '../../config/database/postgres/entities';
import { NotificationTemplateKeys } from './types';
import { FirebaseService } from '../firebase/firebase.service';
import { NotFoundException } from '../../shared/exceptions';

@Injectable()
export class NotificationService {
  constructor(
    private readonly repoService: RepoService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async notify(
    templateKey: NotificationTemplateKeys,
    targets: Credentials[],
    payload: Record<string, string | number | boolean>,
  ) {
    const template =
      await this.repoService.notificationTemplateRepository.findOne({
        where: { key: templateKey },
      });

    if (!template) {
      throw new NotFoundException(
        `cannot find template with key: ${templateKey}`,
      );
    }

    const notification = this.mountNotification(template, payload);
    notification.templateId = template.id;
    await this.repoService.notificationRepository.save(notification);

    const notificationsSent: NotificationSent[] = [];

    for (const credential of targets) {
      const device =
        await this.repoService.notificationDeviceRepository.findOne({
          where: { credentialsId: credential.id },
        });

      const notificationSent = device
        ? await this.notifyByPush(notification, device, credential)
        : await this.notifyByApp(notification, credential);
      notificationsSent.push(notificationSent);
    }

    return notificationsSent;
  }

  async markNotificationAsRead(
    credentials: Credentials,
    notificationSentId: string,
  ) {
    const notificationSent =
      await this.repoService.notificationSentRepository.findOne({
        where: {
          id: notificationSentId,
          credentialsId: credentials.id,
        },
      });

    if (!notificationSent) {
      throw new NotFoundException(
        `cannot find notification sent with id: ${notificationSentId}`,
      );
    }

    notificationSent.isRead = true;

    await this.repoService.notificationSentRepository.save(notificationSent);

    return notificationSent;
  }

  private async notifyByApp(
    notification: Notification,
    credential: Credentials,
  ) {
    return this.repoService.notificationSentRepository.save({
      credentialsId: credential.id,
      notificationId: notification.id,
      isRead: false,
    });
  }

  private async notifyByPush(
    notification: Notification,
    device: NotificationDevice,
    credentials: Credentials,
  ) {
    await this.firebaseService.firebase.messaging().send({
      token: device.token,
      notification: {
        body: notification.body,
        title: notification.title,
      },
    });

    return this.notifyByApp(notification, credentials);
  }

  private mountNotification(
    template: NotificationTemplate,
    variables: Record<string, string | number | boolean>,
  ): Notification {
    const notification = this.repoService.notificationRepository.create();

    const hasAllVariables = template.variables.every((variable) =>
      Reflect.has(variables, variable),
    );

    if (!hasAllVariables) {
      throw new InternalServerErrorException(`cannot apply variables`);
    }

    for (const [variable, value] of Object.entries(variables)) {
      const searchValue = new RegExp(`(\\\$${variable})`, 'g');

      notification.title = template.title.replace(searchValue, String(value));
      notification.body = template.body.replace(searchValue, String(value));
    }

    return notification;
  }
}
