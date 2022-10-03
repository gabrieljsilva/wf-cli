import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepoService } from './repositories.service';
import { objectToArray } from 'shared/serializers';
import * as entities from 'config/database/postgres/entities';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(objectToArray(entities))],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
