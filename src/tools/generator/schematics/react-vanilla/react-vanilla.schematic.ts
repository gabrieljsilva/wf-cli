import { Schematic } from '../../../../shared/types/models/schematic.model';
import { SchematicTemplate } from '../../../../shared/types/models/schematic-template.model';
import { join } from 'path';

export const reactVanillaSchematic = new Schematic({
  name: 'react-vanilla',
  templates: {
    SCREEN: new SchematicTemplate({
      name: 'Screen',
      inputPath: join(__dirname, './templates/template.screen.ejs'),
      outputPath: 'src/screens/%FILE_NAME%.screen.tsx',
    }),
  },
});
