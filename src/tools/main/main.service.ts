import { Injectable } from '@nestjs/common';
import { Menu, Tool } from '../../shared/types';
import { CommandRunner, InquirerService } from 'nest-commander';
import { GeneratorCommander } from '../generator';
import { MainMenuInput } from './domain';
import { ScaffolderCommander } from '../scaffolder';

@Injectable()
export class MainService {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly generatorCommander: GeneratorCommander,
    private readonly scaffolderCommander: ScaffolderCommander,
  ) {}

  async showMainMenu() {
    const { tool } = await this.inquirerService.ask<MainMenuInput>(
      Menu.MAIN,
      undefined,
    );

    const commander = this.getCommanderInstanceByName(tool);
    await commander.run([], {});
  }

  //todo remove this
  async executeToolCLI(tool: Tool) {
    console.log(`executing ${tool} commander`);
  }

  private getCommanderInstanceByName(tool: Tool): CommandRunner {
    const commander = this.commanders[tool];
    if (commander) return commander;

    console.error(`${tool} toolset not implemented yet!`);
    process.exit();
  }

  private get commanders() {
    return {
      [Tool.GENERATOR]: this.generatorCommander,
      [Tool.SCAFFOLDER]: this.scaffolderCommander,
    };
  }
}
