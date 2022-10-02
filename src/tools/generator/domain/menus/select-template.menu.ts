import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'SELECT-MENU' })
export class SelectTemplateMenu {
  @Question({
    message: 'Select the templates you want to generate',
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
