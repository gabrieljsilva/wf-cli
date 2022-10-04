import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';
import * as ora from 'ora';
import { Project, ScaffolderMenuOptions } from './domain';
import { GitService } from '../git';
import { PackageManagerService } from '../package-manager';
import { PackageManager } from '../package-manager/domain/types/package-manager.enum';
import { InquirerService } from 'nest-commander';
import { Menu } from '../../shared/types';
import { PackageManagerMenuOptions } from '../package-manager/domain/types/package-manager-menu-options';

@Injectable()
export class ScaffolderService {
  spinner = ora();
  constructor(
    private readonly gitService: GitService,
    private readonly packageManagerService: PackageManagerService,
    private readonly inquirerService: InquirerService,
  ) {}

  async scaffoldProject(project: Project, options: ScaffolderMenuOptions) {
    const { projectName } = options;
    const outputPath = join(process.cwd(), `./${projectName}`);
    const projectAlreadyExists = existsSync(outputPath);
    if (projectAlreadyExists) {
      console.log(`Project: ${projectName} already exists, use another name!`);
      process.exit(1);
    }

    const { packageManager } =
      await this.inquirerService.ask<PackageManagerMenuOptions>(
        Menu.SELECT_PACKAGE_MANAGER,
        {},
      );

    this.spinner.start('Cloning repository...');

    await this.gitService.clone(project.url, projectName);
    await this.gitService.deleteRepository(outputPath);

    this.spinner.succeed('Repository cloned successfully!');
    this.spinner.start(
      `Installing dependencies. This may take a few minutes, take a coffee while this process is running!`,
    );

    try {
      await this.installNodeModules(outputPath, packageManager);
      this.spinner.succeed(`Modules installed successfully!`);
    } catch (e) {
      this.spinner.fail('Install dependencies failed!');
      console.log(e);
    }
    this.spinner.succeed(
      `Project created successfully, now you can access the ${projectName} folder and start editing it!`,
    );
  }

  async installNodeModules(path: string, manager: PackageManager) {
    return this.packageManagerService.installModules(path, manager);
  }
}
