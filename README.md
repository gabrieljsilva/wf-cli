# WF-CLI
Automate your workflow using this CLI.

## Features

- Module Generator
- Git Utilities
- Project Scaffolder

## Module Generator
Usando esta ferramenta você pode criar módulos inteiros a partir de templates renderizados com EJS.

### Criando o primeiro template
Para começar a criar os templates dos seus módulos você precisa apenas criar uma pasta no diretório src/tools/generator/schematics.
Dentro dessa pasta você vai adicionar um arquivo .ts com o nome do schematic.

Ex: `src/tools/generator/schematics/nestjs-graphql/nestjs-graphql.schematic.ts`

Schematics são conjuntos de arquivos que fazem parte de módulos individuais.
Você poderá criar um schematic diferente para cada projeto seu ou para cada contexto diferente em um mesmo projeto.

Dentro desse arquivo separado iremos exportar uma constante com o nome do nosso schematic o valor deverá ser uma instancia da classe Schematic.
Ex: 

```ts
import { Schematic } from '../../../../shared/types/models/schematic.model';
import { SchematicTemplate } from '../../../../shared/types/models/schematic-template.model';
import { join } from 'path';


export const nestjsGraphqlSchematic = new Schematic({
  name: 'Nestjs Graphql',
  templates: [
    new SchematicTemplate({
      name: 'Service',
      inputPath: join(__dirname, './templates/template.service.ejs'),
      outputPath: 'src/%PACKAGE_NAME%/%MODULE_NAME%/%MODULE_NAME%.screen.tsx',
    }),
  ],
});
```


A classe Schematic recebe dois parâmetros em seu construtor (deve ser único).
- name: deve ser o nome que irá aparecer no menu de seleção de Schematics;
- templates: deve ser uma lista de instancias da classe SchematicTemplate. São objetos que definem cada um dos templates de cada Schematic.

### A classe SchematicTemplate
A classe SchematicTemplate possui 3 parâmetros:

- name: O nome que irá aparecer no menu de seleção de templates;
- inputPath: O diretório absoluto do arquivo .ejs que será renderizado;
- outputPath: O diretório relativo (de onde o comando foi iniciado) na qual o arquivo será salvo;

Você pode personalizar o nome do arquivo de saída passando variáveis para o parâmetro outputPath, as variáveis disponíveis são:

- MODULE_NAME: O nome do módulo respondido no questionário do CLI;
- PACKAGE_NAME: O nome do pacote respondido no questionário do CLI;

Todas as variáveis acima são transformadas no padrão kebab-base;

### Arquivos de template
Usamos a bibliotecas EJS para renderizar os templates, então todos os arquivos de template deverão ser gerados com a extensão .ejs.

Para criar um template você deve acessar o diretório de um Schematic e criar uma pasta chamada templates.
Dentro dela crie um arquivo com um nome referente ao arquivo final.

Ex: `src/tools/generator/schematics/nestjs-graphql/templates/template.service.ejs`

Nesse exemplo iremos criar um template de um service da biblioteca Nest.js.

Dentro desse arquivo você pode criar começar a criar o seu código.

Ex: `src/tools/generator/schematics/nestjs-graphql/templates/template.service.ejs`
```
import { Injectable } from '@nestjs/common';

@Injectable()
export class <%- pascalCase(moduleName) %>Service {}
```

#### Variáveis e utilitários
Existe uma série de váriaveis e utilitários que injetamos para você poder utilizar em arquivos de templates.

- moduleName: Nome do módulo respondido no questionário;
- packageName: Nome do pacote respondido no questionário;
- titleCase(string): Transforma uma string no padrão titleCase;
- upperCase(string): Transforma uma string no padrão upperCase;
- lowerCase(string): Transforma uma string no padrão lowerCase;
- camelCase(string): Transforma uma string no padrão camelCase;
- snakeCase(string): Transforma uma string no padrão snakeCase;
- dotCase(string): Transforma uma string no padrão dotCase;
- pathCase(string): Transforma uma string no padrão pathCase; 
- sentenceCase(string): Transforma uma string no padrão sentenceCase; 
- constantCase(string): Transforma uma string no padrão constantCase;
- kebabCase(string): Transforma uma string no padrão kebabCase;
- pascalCase(string): Transforma uma string no padrão pascalCase;

