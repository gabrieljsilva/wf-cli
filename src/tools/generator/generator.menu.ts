import { Question, QuestionSet } from 'nest-commander';
import { Tool } from '../../shared/types';

@QuestionSet({ name: Tool.GENERATOR })
export class GeneratorMenu {
  @Question({
    name: 'packageName',
    message: 'What is the package name?',
    type: 'input',
    validate: (input: string) => Boolean(input),
  })
  packageName(value: string) {
    return value;
  }

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
    name: 'schematic',
    message: 'What is the schematic?',
    type: 'input',
    validate: (input: string) => Boolean(input),
  })
  schematic(value: string) {
    return value;
  }
}
