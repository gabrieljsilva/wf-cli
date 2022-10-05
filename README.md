# WF-CLI
Automate your workflow using this CLI.

## Features

- Module Generator
- Git Utilities
- Project Scaffolder

## Module Generator
Using this tool you can create entire modules from templates rendered with EJS.

### Creating the first template
To start creating templates for your modules you just need to create a folder in the `src/tools/generator/schematics` directory.
Inside this folder you must add a `.ts` file with the schematic name.

Ex: `src/tools/generator/schematics/nestjs-graphql/nestjs-graphql.schematic.ts`

Schematics are sets of files that are part of individual modules.
You can create a different schematic for each of your projects or for each different context in the same project.

Inside this file you must export a constant with the name of the schematic, the value must be an instance of the Schematic class.

Ex:
```ts
import { Schematic } from '../../../../shared/domain/models/schematic.model';
import { SchematicTemplate } from '../../../../shared/domain/models/schematic-template.model';
import { join } from 'path';


export const nestjsGraphqlSchematic = new Schematic({
  name: 'Nestjs Graphql',
  templates: [
    new SchematicTemplate({
      name: 'Service',
      inputPath: join(__dirname, './templates/service.template.ejs'),
      outputPath: 'src/%PACKAGE_NAME%/%MODULE_NAME%/%MODULE_NAME%.screen.tsx',
    }),
  ],
});
```


The Schematic class takes two parameters in its constructor.
- name: must be the name that will appear in the Schematics' selection menu (must be unique);
- templates: must be a list of SchematicTemplate class instances. They are objects that define each of the templates of the Schematic.

### The SchematicTemplate class
The SchematicTemplate class has 3 parameters:

- name: The name that will appear in the template selection menu;
- inputPath: The absolute directory of the .ejs file that will be rendered;
- outputPath: The relative directory (from where the command was started) in which the file will be saved;

You can customize the output file name by passing variables to the outputPath parameter, the available variables are:

- MODULE_NAME: The name of the module answered in the CLI questionnaire;
- PACKAGE_NAME: The name of the package answered in the CLI questionnaire;

All of the above variables are transformed into the kebab-case pattern;

### Template files
We use the EJS libraries to render the templates, so all template files must be generated with the .ejs extension.

To create a template you must access the directory of a Schematic and create a folder called templates.
Inside it create a file with a name referring to the final file.

Ex: `src/tools/generator/schematics/nestjs-graphql/templates/template.service.ejs`

In this example we will create a service template from the Nest.js library.

Inside that file you can start creating your code.

Ex: `src/tools/generator/schematics/nestjs-graphql/templates/template.service.ejs`
```
import { Injectable } from '@nestjs/common';

@Injectable()
export class <%- pascalCase(moduleName) %>Service {}
```

#### Variables and Utilities
There are a number of variables and utilities that we injected for you to use in template files.

- moduleName: Name of the module answered in the questionnaire;
- packageName: Name of the package answered in the questionnaire;
- titleCase(string): Transforms a string into the titleCase pattern;
- upperCase(string): Transforms a string into the upperCase pattern;
- lowerCase(string): Transforms a string into the lowerCase pattern;
- camelCase(string): Transforms a string into the camelCase pattern;
- snakeCase(string): Transforms a string into the snakeCase pattern;
- dotCase(string): Transforms a string into the dotCase pattern;
- pathCase(string): Transforms a string into the pathCase pattern;
- sentenceCase(string): Transforms a string into the sentenceCase pattern;
- constantCase(string): Transforms a string into the pattern constantCase;
- kebabCase(string): Transforms a string into the pattern kebabCase;
- pascalCase(string): Transforms a string into the pascalCase pattern;