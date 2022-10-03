import { Module } from '@nestjs/common';
import { ScaffolderCommander } from './scaffolder.commander';
import { ScaffolderService } from './scaffolder.service';
import { ScaffolderMenu } from './scaffolder.menu';

@Module({
  providers: [ScaffolderCommander, ScaffolderService, ScaffolderMenu],
  exports: [ScaffolderCommander],
})
export class ScaffolderModule {}
