import { Question, QuestionSet } from 'nest-commander';
import { Menu, Tool } from '../../shared/types';
import { TOOLSETS } from './domain/constants';

@QuestionSet({ name: Menu.MAIN })
export class MainMenu {
  @Question({
    message: 'Which tool set do you want to run?',
    name: 'tool',
    type: 'list',
    choices: [
      ...Object.entries(TOOLSETS).map(([key, label]) => ({
        value: key,
        name: label,
      })),
    ],
  })
  parseToolName(value: Tool): Tool {
    return value;
  }
}
