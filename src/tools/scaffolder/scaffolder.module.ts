import { Module } from '@nestjs/common';
import { ScaffolderCommander } from './scaffolder.commander';
import { ScaffolderService } from './scaffolder.service';
import { ScaffolderMenu } from './scaffolder.menu';
import { GitModule } from '../git';
import { PackageManagerModule } from '../package-manager';

@Module({
  imports: [GitModule, PackageManagerModule],
  providers: [ScaffolderCommander, ScaffolderService, ScaffolderMenu],
  exports: [ScaffolderCommander],
})
export class ScaffolderModule {}
