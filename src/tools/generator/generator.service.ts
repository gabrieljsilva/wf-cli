import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { join } from 'path';
import * as ora from 'ora';
import * as fs from 'fs';
import { renderFile } from 'ejs';
import { GeneratorMenuOptions } from './domain/types';
import { Tool } from '../../shared/types';
import { sentenceCase, validateOrThrowError } from '../../shared/utils';
import * as caseModifiers from '../../shared/utils/case-modifiers';
import * as availableSchematics from './schematics';
import { Schematic } from '../../shared/types/models/schematic.model';

@Injectable()
export class GeneratorService {
  private spinner = ora();

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

    await this.renderTemplateAndSaveFile(schematic, options);
  }

  async renderTemplateAndSaveFile(
    schematic: Schematic,
    options: GeneratorMenuOptions,
  ) {
    for (const template of schematic.templates) {
      const label = sentenceCase(template.name);
      this.spinner.start(`processing file: ${label}!`);
      const outputFilePath = template.outputPath.replace(
        '%FILE_NAME%',
        caseModifiers.kebabCase(options.moduleName),
      );
      const fileExists = fs.existsSync(join(process.cwd(), outputFilePath));
      if (fileExists) {
        this.spinner.fail(`${label} file already exists`);
        continue;
      }
      const templateVariables = {
        ...options,
        ...caseModifiers,
      };
      const fileString = await renderFile(
        template.inputPath,
        templateVariables,
      );
      this.spinner.succeed(`saving file: ${outputFilePath} `);

      this.createFoldersFromStringPath(outputFilePath);
      fs.writeFileSync(outputFilePath, fileString);

      this.spinner.succeed(`${label} created successfully!`);
    }
  }

  getSchematicByName(schematicName: string) {
    const schematics = Object.values(availableSchematics);
    return schematics.find(
      (schematic) =>
        schematic.name.toUpperCase() === schematicName.toUpperCase(),
    );
  }

  createFoldersFromStringPath(string: string) {
    const paths = string.split('/');
    paths.pop();
    const foldersPaths = paths.join('/');
    fs.mkdirSync(foldersPaths, { recursive: true });
  }
}
