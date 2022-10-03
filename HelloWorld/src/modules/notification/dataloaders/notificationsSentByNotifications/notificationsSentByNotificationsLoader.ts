import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { NotificationSent } from '../../../../config/database/postgres/entities';
import { RepoService } from '../../../repositories';

@Injectable()
export class NotificationsSentByNotificationsLoader {
  public loader: DataLoader<string, NotificationSent[]>;

  constructor(private readonly repoService: RepoService) {
    this.loader = new DataLoader(async (keys) => {
      return this.batchNotificationsSent(keys);
    });
  }

  private async batchNotificationsSent(notificationsIds: readonly string[]) {
    const notificationsSent = await this.repoService.notificationSentRepository
      .createQueryBuilder('notification_sent')
      .where('notification_sent.notification_id IN (:...notificationsIds)', {
        notificationsIds,
      })
      .getMany();

    const notificationIdToNotificationsSent =
      NotificationsSentByNotificationsLoader.mapById(notificationsSent);

    return notificationsIds.map((notificationId) =>
      notificationIdToNotificationsSent.get(notificationId),
    );
  }

  private static mapById(notificationsSent: NotificationSent[]) {
    const notificationIdToNotificationsSent = new Map<
      string,
      NotificationSent[]
    >();

    for (const notificationSent of notificationsSent) {
      if (
        notificationIdToNotificationsSent.has(notificationSent.notificationId)
      ) {
        notificationIdToNotificationsSent
          .get(notificationSent.notificationId)
          .push(notificationSent);
      } else {
        notificationIdToNotificationsSent.set(notificationSent.notificationId, [
          notificationSent,
        ]);
      }
    }

    return notificationIdToNotificationsSent;
  }
}
