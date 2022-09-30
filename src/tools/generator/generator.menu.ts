import { Question, QuestionSet } from 'nest-commander';
import { Tool } from '../../shared/types';
import { GeneratorMenuOptions } from './domain/types';
import * as availableSchematics from './schematics';
import { sentenceCase } from '../../shared/utils';

@QuestionSet({ name: Tool.GENERATOR })
export class GeneratorMenu {
  @Question({
    name: 'moduleName',
    message: 'What is the module name?',
    type: 'input',
    validate: (input: string) => Boolean(input),
  })
  moduleName(value: string) {
    return value;
  }

  @Question({
    name: 'packageName',
    message: 'What is the package name?',
    type: 'input',
    default: (options: GeneratorMenuOptions) => options.moduleName,
    validate: (input: string) => Boolean(input),
  })
  packageName(value: string) {
    return value;
  }

  @Question({
    name: 'schematic',
    message: 'What is the schematic?',
    type: 'list',
    validate: (input: string) => Boolean(input),
    choices: Object.values(availableSchematics).map((schematic) => ({
      name: sentenceCase(schematic.name),
      value: schematic.name,
    })),
  })
  schematic(value: string) {
    return value;
  }
}
