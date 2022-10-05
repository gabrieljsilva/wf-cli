import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { join } from 'path';
import * as ora from 'ora';
import * as fs from 'fs';
import { renderFile } from 'ejs';
import { exec } from 'child_process';
import { GeneratorMenuOptions, SelectTemplateMenuOptions } from './domain';
import { Menu } from '../../shared/types';
import {
  getDirectoryByFilePath,
  getFileNameByPath,
  kebabCase,
  validateOrThrowError,
} from '../../shared/utils';
import * as caseModifiers from '../../shared/utils/case-modifiers';
import * as availableSchematics from './schematics';
import { Schematic } from '../../shared/types/models/schematic.model';
import { MAX_BUFFER_SIZE } from '../../shared/constants';

@Injectable()
export class GeneratorService {
  private spinner = ora();

  constructor(private readonly inquirerService: InquirerService) {}
  async showGeneratorMenu(options: GeneratorMenuOptions) {
    options &&= await this.inquirerService.ask<GeneratorMenuOptions>(
      Menu.GENERATOR,
      options,
    );
    await validateOrThrowError(options, GeneratorMenuOptions);
    await this.generateFilesBySchematic(options);
  }

  async generateFilesBySchematic(options: GeneratorMenuOptions) {
    const schematic = this.getSchematicByName(options.schematic);
    if (!schematic) {
      this.spinner.fail(`cannot find schematic: ${options.schematic}`);
      process.exit(1);
    }

    await this.renderTemplatesAndSaveFile(schematic, options);

    this.spinner.succeed('Module created successfully!');
    this.spinner.start('Running Prettier...');

    try {
      await this.runPrettier();
      this.spinner.succeed('Now your code is beautiful!');
    } catch {
      this.spinner.warn(
        'cannot run prettier, maybe it not exists in this project!',
      );
    }
  }

  async renderTemplatesAndSaveFile(
    schematic: Schematic,
    options: GeneratorMenuOptions,
  ) {
    const { templates } =
      await this.inquirerService.ask<SelectTemplateMenuOptions>(
        Menu.SELECT_TEMPLATES,
        { context: { schematic } },
      );

    for (const template of templates) {
      this.spinner.start(`processing file: ${template.name}!`);
      const outputFilePath = template.outputPath
        .replace(/%MODULE_NAME%/g, caseModifiers.kebabCase(options.moduleName))
        .replace(
          /%PACKAGE_NAME%/g,
          caseModifiers.kebabCase(options.packageName),
        );

      const fileExists = fs.existsSync(join(process.cwd(), outputFilePath));
      if (fileExists) {
        this.spinner.fail(`${template.name} file already exists`);
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
      this.spinner.succeed(`Saving file: ${outputFilePath} `);

      this.createFoldersFromPathString(outputFilePath);
      fs.writeFileSync(outputFilePath, fileString);

      this.spinner.succeed(`${template.name} created successfully!`);

      if (template.useBarrelExport) {
        const templateDirectory = getDirectoryByFilePath(outputFilePath);

        await this.appendExportPathToBarrelFile(
          templateDirectory,
          getFileNameByPath(outputFilePath),
        );
      }
    }
  }

  getSchematicByName(schematicName: string) {
    const schematics = Object.values(availableSchematics);
    return schematics.find(
      (schematic) =>
        schematic.name.toUpperCase() === schematicName.toUpperCase(),
    );
  }

  createFoldersFromPathString(string: string) {
    const directory = getDirectoryByFilePath(string);
    fs.mkdirSync(directory, { recursive: true });
  }

  async runPrettier() {
    return new Promise((resolve, reject) => {
      exec(
        'npx prettier ./src/** --write',
        { maxBuffer: MAX_BUFFER_SIZE, cwd: process.cwd() },
        (error) => {
          if (error) {
            reject(error);
          }

          resolve(null);
        },
      );
    });
  }

  async createBarrelFileAndAppendExportPath(path: string, fileName: string) {
    const indexFilePath = join(path, 'index.ts');
    fs.writeFileSync(indexFilePath, `export * from './${fileName}'\n`);
    return fs.existsSync(indexFilePath);
  }

  async appendExportPathToBarrelFile(path: string, fileName: string) {
    const indexFilePath = join(path, 'index.ts');
    const indexFileExists = fs.existsSync(indexFilePath);

    const [moduleName, moduleType] = fileName.split('.');
    const parsedModuleName = [kebabCase(moduleName), moduleType].join('.');

    if (indexFileExists) {
      fs.writeFileSync(
        indexFilePath,
        `export * from './${parsedModuleName}'\n`,
        {
          flag: 'a',
        },
      );
    } else {
      return this.createBarrelFileAndAppendExportPath(path, parsedModuleName);
    }
  }
}
