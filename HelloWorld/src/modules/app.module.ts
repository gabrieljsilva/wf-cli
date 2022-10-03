import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { formatError } from '../config/graphql';
import OrmConfig from '../config/database/postgres/orm.config';
import { RepoModule } from './repositories';
import { UserModule } from './user';
import { CredentialsModule } from './credentials';
import { TokenModule } from './token';
import { MailerModule } from './mailer';
import { AuthModule } from './auth';
import { UploadModule } from './upload';
import { NotificationModule } from './notification';
import { NotificationSentModule } from './notificationSent/notification-sent.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '../config/winston';
import { Connection } from 'typeorm';
import * as seeders from '../config/database/postgres/seeders';
import { objectToArray } from '../shared/serializers';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    GraphQLModule.forRootAsync({
      inject: [DataloaderService],
      useFactory() {
        return {
          autoSchemaFile: true,
          formatError: formatError,
          context: ({ request }) => ({
            req: request,
          }),
          uploads: false,
        };
      },
    }),
    RepoModule,
    UserModule,
    CredentialsModule,
    TokenModule,
    MailerModule,
    AuthModule,
    UploadModule,
    NotificationModule,
    NotificationSentModule,
    DataloaderModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@InjectDataSource() private readonly dataSource: Connection) {}

  async onModuleInit() {
    for (const Seeder of objectToArray(seeders)) {
      const seeder = new Seeder(this.dataSource);
      seeder.seed();
    }
  }
}
