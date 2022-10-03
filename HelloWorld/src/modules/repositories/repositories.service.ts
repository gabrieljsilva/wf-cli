import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as entities from 'config/database/postgres/entities';

@Injectable()
export class RepoService {
  constructor(
    @InjectRepository(entities.Credentials)
    public readonly credentialsRepository: Repository<entities.Credentials>,
    @InjectRepository(entities.User)
    public readonly userRepository: Repository<entities.User>,
    @InjectRepository(entities.Token)
    public readonly tokenRepository: Repository<entities.Token>,
    @InjectRepository(entities.UploadMetadata)
    public readonly uploadMetadataRepository: Repository<entities.UploadMetadata>,
    @InjectRepository(entities.Notification)
    public readonly notificationRepository: Repository<entities.Notification>,
    @InjectRepository(entities.NotificationTemplate)
    public readonly notificationTemplateRepository: Repository<entities.NotificationTemplate>,
    @InjectRepository(entities.NotificationType)
    public readonly notificationTypeRepository: Repository<entities.NotificationType>,
    @InjectRepository(entities.NotificationDevice)
    public readonly notificationDeviceRepository: Repository<entities.NotificationDevice>,
    @InjectRepository(entities.NotificationSent)
    public readonly notificationSentRepository: Repository<entities.NotificationSent>,
  ) {}
}
