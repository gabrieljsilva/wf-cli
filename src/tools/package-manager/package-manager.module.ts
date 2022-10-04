import { Module } from '@nestjs/common';
import { PackageManagerService } from './package-manager.service';
import { PackageManagerMenu } from './package-manager.menu';

@Module({
  providers: [PackageManagerService, PackageManagerMenu],
  exports: [PackageManagerService],
})
export class PackageManagerModule {}
