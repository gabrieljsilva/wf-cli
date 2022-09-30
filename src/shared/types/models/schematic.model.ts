import { SchematicTemplate } from './schematic-template.model';

export class Schematic {
  name: string;
  templates: { [key: string]: SchematicTemplate };

  constructor(schematic: Schematic) {
    this.name = schematic.name;
    this.templates = schematic.templates;
  }
}
