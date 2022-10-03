import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { FirebaseModule } from '../firebase';

@Module({
  imports: [FirebaseModule],
  providers: [NotificationService, NotificationResolver],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
