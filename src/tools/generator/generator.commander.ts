import { Command, CommandRunner, Option } from 'nest-commander';
import { Tool } from '../../shared/types';
import { GeneratorMenuOptions } from './domain/types/generator-menu-options.interface';
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
    const { packageName, moduleName, schema } = options;
    if (packageName && moduleName && schema) {
      return await this.generatorService.generateSchema(options);
    }
    return this.generatorService.showGeneratorMenu(options);
  }

  @Option({
    flags: '-p, --package-name, [packageName]',
  })
  packageName(value: string) {
    return value;
  }

  @Option({
    flags: '-m, --module-name, [moduleName]',
  })
  moduleName(value: string) {
    return value;
  }

  @Option({
    flags: '-s, --schema, [schema]',
  })
  schema(value: string) {
    return value;
  }
}
