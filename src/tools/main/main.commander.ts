import { Command, CommandRunner, Option } from 'nest-commander';
import { Tool } from '../../shared/types';
import { CommandOptionsInterface } from './domain';
import { MainService } from './main.service';

@Command({
  name: Tool.MAIN,
  aliases: [Tool.MAIN.toLowerCase()],
})
export class MainCommander extends CommandRunner {
  constructor(private readonly mainService: MainService) {
    super();
  }

  async run(args: string[], options: CommandOptionsInterface) {
    const { tool } = options;
    tool
      ? this.mainService.executeToolCLI(tool)
      : this.mainService.showMainMenu();
  }

  @Option({
    name: 'tool',
    flags: '-t, --tool <tool>',
  })
  parseToolName(toolNameInput: string): Tool {
    const toolName: Tool = toolNameInput.toUpperCase() as Tool;
    const toolExists = Object.values(Tool)
      .filter((tool) => tool !== Tool.MAIN)
      .includes(toolName);

    if (toolExists) {
      return toolName;
    }

    console.error(`cannot find tool: ${toolNameInput}`);
  }
}
