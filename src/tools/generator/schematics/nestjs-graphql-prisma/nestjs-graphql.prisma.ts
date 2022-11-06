import { Schematic } from '../../../../shared/types/models/schematic.model';
import { join } from 'path';

export const nestjsGraphqlPrisma = new Schematic({
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
    {
      name: 'Filterable',
      inputPath: join(__dirname, './templates/filterable.template.ejs'),
      outputPath: 'src/domain/filters/%MODULE_NAME%.filters.ts',
      useBarrelExport: true,
    },
    {
      name: 'Prisma Model',
      inputPath: join(__dirname, './templates/prisma-model.template.ejs'),
      outputPath: 'src/infra/database/prisma/models/%MODULE_NAME%.prisma',
      useBarrelExport: false,
    },
    {
      name: 'Pagination',
      inputPath: join(__dirname, './templates/paginated.template.ejs'),
      outputPath: 'src/domain/paginations/%MODULE_NAME%.paginated.ts',
      useBarrelExport: true,
    },
    {
      name: 'Create DTO',
      inputPath: join(__dirname, './templates/create-dto.template.ejs'),
      outputPath: 'src/domain/dtos/%MODULE_NAME%/create-%MODULE_NAME%.dto.ts',
      useBarrelExport: true,
    },
  ],
});
