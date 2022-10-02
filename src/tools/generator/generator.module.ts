import { Module } from '@nestjs/common';
import { GeneratorCommander } from './generator.commander';
import { GeneratorService } from './generator.service';
import { GeneratorMenu, SelectTemplateMenu } from './domain';

@Module({
  providers: [
    GeneratorCommander,
    GeneratorService,
    GeneratorMenu,
    SelectTemplateMenu,
  ],
  exports: [GeneratorCommander],
})
export class GeneratorModule {}
