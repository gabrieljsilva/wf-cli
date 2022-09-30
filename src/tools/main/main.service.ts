import { Injectable } from '@nestjs/common';
import { Tool } from '../../shared/types';
import { CommandRunner, InquirerService } from 'nest-commander';
import { GeneratorCommander } from '../generator';
import { MainMenuInputInterface } from './domain';

@Injectable()
export class MainService {
  constructor(
    private readonly inquirerService: InquirerService,
    private readonly generatorCommander: GeneratorCommander,
  ) {}

  async showMainMenu() {
    const { tool } = await this.inquirerService.ask<MainMenuInputInterface>(
      Tool.MAIN,
      {},
    );

    const commander = this.getCommanderInstanceByName(tool);
    await commander.run([]);
  }

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
    };
  }
}
