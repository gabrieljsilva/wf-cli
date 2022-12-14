import { Command, CommandRunner, Option } from 'nest-commander';
import { Tool } from '../../shared/types';
import { GeneratorMenuOptions } from './domain';
import { GeneratorService } from './generator.service';

@Command({
  name: Tool.GENERATOR,
  aliases: [Tool.GENERATOR.toLowerCase()],
})
export class GeneratorCommander extends CommandRunner {
  constructor(private readonly generatorService: GeneratorService) {
    super();
  }

  async run(args: string[], options: GeneratorMenuOptions) {
    return this.generatorService.showGeneratorMenu(options);
  }

  @Option({
    name: 'packageName',
    flags: '-p, --package-name, <string>',
  })
  packageName(value: string) {
    return value;
  }

  @Option({
    name: 'moduleName',
    flags: '-m, --module-name, <string>',
  })
  moduleName(value: string) {
    return value;
  }

  @Option({
    name: 'schematic',
    flags: '-s, --schematic, <string>',
  })
  schematic(value: string) {
    return value;
  }
}
