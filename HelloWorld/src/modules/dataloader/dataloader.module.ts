import { Global, Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { NotificationByNotificationSentLoader } from '../notificationSent/dataloaders';
import { NotificationsSentByNotificationsLoader } from '../notification/dataloaders';

@Global()
@Module({
  providers: [
    DataloaderService,
    NotificationByNotificationSentLoader,
    NotificationsSentByNotificationsLoader,
  ],
  exports: [DataloaderService],
})
export class DataloaderModule {}
