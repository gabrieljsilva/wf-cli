import { Schematic } from '../../../../shared/types/models/schematic.model';
import { join } from 'path';

export const nestjsGraphQlPrisma = new Schematic({
  name: 'NestJS GraphQL With Prisma',
  templates: [
    {
      name: 'Service',
      inputPath: join(__dirname, './templates/service.template.ejs'),
      outputPath:
        'src/packages/%PACKAGE_NAME%/modules/%MODULE_NAME%/%MODULE_NAME%.service.ts',
      useBarrelExport: true,
    },
    {
      name: 'Module',
      inputPath: join(__dirname, './templates/module.template.ejs'),
      outputPath:
        'src/packages/%PACKAGE_NAME%/modules/%MODULE_NAME%/%MODULE_NAME%.module.ts',
      useBarrelExport: true,
    },
    {
      name: 'Resolver',
      inputPath: join(__dirname, './templates/resolver.template.ejs'),
      outputPath:
        'src/packages/%PACKAGE_NAME%/modules/%MODULE_NAME%/%MODULE_NAME%.resolver.ts',
      useBarrelExport: true,
    },
    {
      name: 'Model',
      inputPath: join(__dirname, './templates/model.template.ejs'),
      outputPath: 'src/domain/models/%MODULE_NAME%.model.ts',
      useBarrelExport: true,
    },
  ],
});
