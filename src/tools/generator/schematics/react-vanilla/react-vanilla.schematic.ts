import { Schematic } from '../../../../shared/types/models/schematic.model';
import { SchematicTemplate } from '../../../../shared/types/models/schematic-template.model';
import { join } from 'path';

export const reactVanillaSchematic = new Schematic({
  name: 'React Vanilla',
  templates: [
    new SchematicTemplate({
      name: 'Screen',
      inputPath: join(__dirname, './templates/template.screen.ejs'),
      outputPath: 'src/screens/%MODULE_NAME%.screen.tsx',
    }),
  ],
});
