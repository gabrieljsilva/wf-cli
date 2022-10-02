import { Schematic } from '../../../../shared/types/models/schematic.model';
import { SchematicTemplate } from '../../../../shared/types/models/schematic-template.model';

export interface SelectTemplateMenuOptions {
  templates: SchematicTemplate[];
  context: {
    schematic: Schematic;
  };
}
