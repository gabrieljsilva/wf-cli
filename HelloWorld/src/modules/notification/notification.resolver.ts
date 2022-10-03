import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Credentials,
  Notification,
  NotificationSent,
} from '../../config/database/postgres/entities';
import { CreateNotificationDto, NotificationTemplateKeys } from './types';
import { In } from 'typeorm';
import { RepoService } from '../repositories';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../../shared/guards';
import { CurrentUserCredentials } from '../../shared/decorators';
import { DataloaderService } from '../dataloader/dataloader.service';

@Resolver(Notification)
export class NotificationResolver {
  constructor(
    private readonly repoService: RepoService,
    private readonly notificationService: NotificationService,
    private readonly dataLoaderService: DataloaderService,
  ) {}

  @UseGuards(GQLAuthGuard)
  @Mutation(() => [NotificationSent])
  async createNotification(
    @Args('data', { type: () => CreateNotificationDto })
    createNotificationDTO: CreateNotificationDto,
  ): Promise<NotificationSent[]> {
    const credentials = await this.repoService.credentialsRepository.find({
      where: {
        id: In(createNotificationDTO.targets),
      },
    });

    return this.notificationService.notify(
      NotificationTemplateKeys.SUCCESS_TO_SEND_NOTIFICATION,
      credentials,
      createNotificationDTO.variables,
    );
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => NotificationSent)
  async markNotificationAsRead(
    @Args('notificationId') notificationId: string,
    @CurrentUserCredentials() credentials: Credentials,
  ) {
    return this.notificationService.markNotificationAsRead(
      credentials,
      notificationId,
    );
  }

  @ResolveField(() => [NotificationSent])
  notificationsSent(@Parent() notification: Notification) {
    return this.dataLoaderService.notificationsSentByNotifications.load(
      notification.id,
    );
  }
}
