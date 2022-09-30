import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { join } from 'path';
import { renderFile } from 'ejs';
import { GeneratorMenuOptions } from './domain/types';
import { Tool } from '../../shared/types';
import { validateOrThrowError } from '../../shared/utils';
import * as caseModifiers from '../../shared/utils/case-modifiers';
import * as availableSchematics from './schematics';
import { Schematic } from '../../shared/types/models/schematic.model';

@Injectable()
export class GeneratorService {
  private schematicsPath = join(__dirname, './schematics');

  constructor(private readonly inquirerService: InquirerService) {}
  async showGeneratorMenu(options: GeneratorMenuOptions) {
    options &&= await this.inquirerService.ask<GeneratorMenuOptions>(
      Tool.GENERATOR,
      options,
    );
    await validateOrThrowError(options, GeneratorMenuOptions);
    await this.generateFilesBySchematic(options);
  }

  async generateFilesBySchematic(options: GeneratorMenuOptions) {
    const schematic = this.getSchematicByName(options.schematic);

    if (!schematic) {
      console.error(`cannot find schematic: ${options.schematic}`);
      process.exit(1);
    }

    const renderedTemplates = await this.renderTemplate(schematic, options);

    console.log(renderedTemplates);
  }

  async renderTemplate(schematic: Schematic, options: GeneratorMenuOptions) {
    const renderedTemplates: Record<string, string> = {};
    for (const [key, template] of Object.entries(schematic.templates)) {
      renderedTemplates[key] = await renderFile(template.inputPath, {
        ...options,
        caseModifiers,
      });
    }
    return renderedTemplates;
  }

  getSchematicByName(schematicName: string) {
    const schematics = Object.values(availableSchematics);
    return schematics.find(
      (schematic) =>
        schematic.name.toUpperCase() === schematicName.toUpperCase(),
    );
  }
}
