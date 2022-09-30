import { Module } from '@nestjs/common';
import { GeneratorCommander } from './generator.commander';
import { GeneratorService } from './generator.service';
import { GeneratorMenu } from './generator.menu';

@Module({
  providers: [GeneratorCommander, GeneratorService, GeneratorMenu],
  exports: [GeneratorCommander],
})
export class GeneratorModule {}
