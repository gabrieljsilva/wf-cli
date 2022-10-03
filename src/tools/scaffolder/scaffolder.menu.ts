import { Question, QuestionSet } from 'nest-commander';
import { Menu } from '../../shared/types';
import * as projects from './domain/projects/projects.json';

@QuestionSet({
  name: Menu.SCAFFOLDER,
})
export class ScaffolderMenu {
  @Question({
    name: 'projectName',
    message: 'Enter the project name: ',
    type: 'input',
  })
  parseProjectName(value: string) {
    return value;
  }

  @Question({
    name: 'scaffolderName',
    type: 'list',
    message: 'Select the project template you want to scaffold:',
    choices: projects.map((project) => ({
      name: project.label,
      value: project.key,
    })),
  })
  parseScaffolderName(value: string) {
    return value;
  }
}
