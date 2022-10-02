import { Schematic } from '../../../../shared/types/models/schematic.model';
import { join } from 'path';

export const nestGraphqlSchematic = new Schematic({
  name: 'Nest GraphQL',
  templates: [
    {
      name: 'Service',
      inputPath: join(__dirname, './templates/template.service.ejs'),
      outputPath:
        'src/packages/%PACKAGE_NAME%/%MODULE_NAME%/%MODULE_NAME%.service.ts',
    },
    {
      name: 'Module',
      inputPath: join(__dirname, './templates/template.module.ejs'),
      outputPath:
        'src/packages/%PACKAGE_NAME%/%MODULE_NAME%/%MODULE_NAME%.module.ts',
    },
  ],
});
