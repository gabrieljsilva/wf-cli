import { Injectable } from '@nestjs/common';
import { RepoService } from '../repositories';
import {
  Credentials,
  NotificationSent,
} from '../../config/database/postgres/entities';

@Injectable()
export class NotificationSentService {
  constructor(private readonly repoService: RepoService) {}

  async getNotificationsSent(
    credentials: Credentials,
  ): Promise<NotificationSent[]> {
    return this.repoService.notificationSentRepository
      .createQueryBuilder('notification_sent')
      .where('notification_sent.credentials_id = :credentialsId', {
        credentialsId: credentials.id,
      })
      .getMany();
  }
}
