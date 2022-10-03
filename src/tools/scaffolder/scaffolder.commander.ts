import {
  Command,
  CommandRunner,
  InquirerService,
  Option,
} from 'nest-commander';
import { Menu, Tool } from '../../shared/types';
import { ScaffolderMenuOptions } from './domain';
import * as projects from './domain/projects/projects.json';
import { ScaffolderService } from './scaffolder.service';

@Command({
  name: Tool.SCAFFOLDER,
  aliases: [Tool.SCAFFOLDER.toLowerCase()],
})
export class ScaffolderCommander extends CommandRunner {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly scaffolderService: ScaffolderService,
  ) {
    super();
  }

  async run(args: string[], options: ScaffolderMenuOptions) {
    const { scaffolderName } =
      await this.inquirerService.ask<ScaffolderMenuOptions>(
        Menu.SCAFFOLDER,
        options,
      );

    const project = projects.find(
      (project) => project.key.toLowerCase() === scaffolderName.toLowerCase(),
    );

    if (!project) {
      console.error(`cannot find project: ${scaffolderName}`);
      process.exit(1);
    }

    if (!project.url) {
      console.error(`url of project: ${scaffolderName} not defined!`);
      process.exit(1);
    }

    await this.scaffolderService.scaffoldProject(project, options);
  }

  @Option({
    name: 'scaffolderName',
    flags: '-s, --scaffolderName <string>',
  })
  parseScaffolderName(value: string) {
    return value;
  }

  @Option({
    name: 'projectName',
    flags: '-n, --projectName <string>',
  })
  parseProjectName(value: string) {
    return value;
  }
}
