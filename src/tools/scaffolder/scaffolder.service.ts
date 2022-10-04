import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';
import * as ora from 'ora';
import { Project, ScaffolderMenuOptions } from './domain';
import { GitService } from '../git';
import { MAX_BUFFER_SIZE } from '../../shared/constants';

@Injectable()
export class ScaffolderService {
  spinner = ora();
  constructor(private readonly gitService: GitService) {}

  async scaffoldProject(project: Project, options: ScaffolderMenuOptions) {
    const { projectName } = options;
    const outputPath = join(process.cwd(), `./${projectName}`);
    const projectAlreadyExists = existsSync(outputPath);
    if (projectAlreadyExists) {
      console.log(`project: ${projectName} already exists, use another name!`);
      process.exit(1);
    }

    this.spinner.start('Cloning repository...');

    await this.gitService.clone(project.url, projectName);
    await this.gitService.deleteRepository(outputPath);

    this.spinner.succeed('Repository cloned successfully!');
    this.spinner.start(
      `Installing dependencies. This may take a few minutes, take a coffee while this process is running!`,
    );
    try {
      await this.installNodeModules(outputPath);
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
        error ? reject(error) : resolve(null);
      });
    });
  }
}
