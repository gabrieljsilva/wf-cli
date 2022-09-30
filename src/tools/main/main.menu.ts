import { Question, QuestionSet } from 'nest-commander';
import { Tool } from '../../shared/types';
import { TOOLSETS } from './domain/constants';

@QuestionSet({ name: Tool.MAIN })
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
