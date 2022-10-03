import { Injectable } from '@nestjs/common';
import { NotificationByNotificationSentLoader } from '../notificationSent/dataloaders';
import DataLoader from 'dataloader';
import { NotificationsSentByNotificationsLoader } from '../notification/dataloaders';
import {
  Notification,
  NotificationSent,
} from '../../config/database/postgres/entities';

@Injectable()
export class DataloaderService {
  public notificationByNotificationSent: DataLoader<string, Notification>;
  public notificationsSentByNotifications: DataLoader<
    string,
    NotificationSent[]
  >;

  constructor(
    private readonly notificationByNotificationSentLoader: NotificationByNotificationSentLoader,
    private readonly notificationsSentByNotificationsLoader: NotificationsSentByNotificationsLoader,
  ) {
    this.notificationByNotificationSent =
      this.notificationByNotificationSentLoader.loader;

    this.notificationsSentByNotifications =
      this.notificationsSentByNotificationsLoader.loader;
  }
}
