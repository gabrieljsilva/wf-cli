import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Project, ScaffolderMenuOptions } from './domain';
import { join } from 'path';
import { existsSync } from 'fs';
import { GitService } from '../git';
import * as ora from 'ora';
import { MAX_BUFFER_SIZE } from '../../shared/constants';

@Injectable()
export class ScaffolderService {
  spinner = ora();
  constructor(private readonly gitService: GitService) {}

  async scaffoldProject(project: Project, options: ScaffolderMenuOptions) {
    const { projectName } = options;
    const pathThatProjectWillBeSaved = join(process.cwd(), `./${projectName}`);
    const projectAlreadyExists = existsSync(pathThatProjectWillBeSaved);
    if (projectAlreadyExists) {
      console.log(`project: ${projectName} already exists, use another name!`);
      process.exit(1);
    }

    this.spinner.start('Cloning repository...');

    await this.gitService.clone(project.url, projectName);
    await this.gitService.deleteRepository(join(process.cwd(), projectName));

    this.spinner.succeed('Repository cloned successfully!');
    this.spinner.start(
      `Installing dependencies. This may take a few minutes, take a coffee while this process is running!`,
    );
    try {
      await this.installNodeModules(pathThatProjectWillBeSaved);
      this.spinner.succeed(`Modules installed successfully!`);
    } catch (e) {
      this.spinner.fail('Install dependencies failed!');
      console.log(e);
    }
    this.spinner.succeed(
      `Project created successfully, now you can access the ${projectName} folder and start editing it!`,
    );
  }

  async installNodeModules(path: string) {
    return new Promise((resolve, reject) => {
      exec(`yarn`, { cwd: path, maxBuffer: MAX_BUFFER_SIZE }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(null);
      });
    });
  }
}
