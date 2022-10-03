import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { RepoService } from '../../../repositories';
import { Notification } from '../../../../config/database/postgres/entities';

@Injectable()
export class NotificationByNotificationSentLoader {
  loader: DataLoader<string, Notification>;
  constructor(private readonly repoService: RepoService) {
    this.loader = new DataLoader(async (keys) => {
      return await this.batchNotifications(keys);
    });
  }

  private async batchNotifications(notificationsSentIds: readonly string[]) {
    return await this.repoService.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.notificationsSent', 'notification_sent')
      .where('notification_sent.id IN (:...notificationsSentIds)', {
        notificationsSentIds: notificationsSentIds,
      })
      .getMany();
  }
}
