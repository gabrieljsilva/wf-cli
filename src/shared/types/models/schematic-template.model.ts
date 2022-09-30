import { DefaultTemplateVariables } from './default-template-variables.model';

export class SchematicTemplate<
  T extends DefaultTemplateVariables = DefaultTemplateVariables,
> {
  name: string;
  inputPath: string;
  outputPath: string;
  variables?: T;

  constructor(params: Omit<SchematicTemplate<T>, 'variables'>) {
    this.name = params.name;
    this.inputPath = params.inputPath;
    this.outputPath = params.outputPath;
  }
}
