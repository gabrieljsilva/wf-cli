import { Question, QuestionSet } from 'nest-commander';
import { Menu } from '../../../../shared/types';

@QuestionSet({ name: Menu.SELECT_TEMPLATES })
export class SelectTemplateMenu {
  @Question({
    message: 'Select the templates you want to generate: ',
    name: 'templates',
    type: 'checkbox',
    choices: ({ context }) =>
      context.schematic.templates.map((template) => ({
        name: template.name,
        value: template,
      })),
    default: ({ context }) =>
      context.schematic.templates.map((template) => template),
  })
  asyncParseSelectedTemplate(value: string) {
    return value;
  }
}
