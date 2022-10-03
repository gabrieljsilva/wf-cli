import { Module } from '@nestjs/common';
import { NotificationSentResolver } from './notification-sent.resolver';
import { NotificationSentService } from './notification-sent.service';

@Module({
  imports: [],
  providers: [NotificationSentResolver, NotificationSentService],
  exports: [NotificationSentService],
})
export class NotificationSentModule {}
