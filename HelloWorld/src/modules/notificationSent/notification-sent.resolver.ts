import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Credentials,
  Notification,
  NotificationSent,
} from '../../config/database/postgres/entities';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../../shared/guards';
import { CurrentUserCredentials } from '../../shared/decorators';
import { NotificationSentService } from './notification-sent.service';
import { RepoService } from '../repositories';
import { DataloaderService } from '../dataloader/dataloader.service';

@Resolver(NotificationSent)
export class NotificationSentResolver {
  constructor(
    private readonly notificationSentService: NotificationSentService,
    private readonly repoService: RepoService,
    private readonly dataLoaderService: DataloaderService,
  ) {}

  @UseGuards(GQLAuthGuard)
  @Query(() => [NotificationSent])
  async getNotificationsSent(
    @CurrentUserCredentials() credentials: Credentials,
  ) {
    return this.notificationSentService.getNotificationsSent(credentials);
  }

  @ResolveField(() => Notification)
  async notification(@Parent() notificationSent: NotificationSent) {
    return this.dataLoaderService.notificationByNotificationSent.load(
      notificationSent.id,
    );
  }
}
