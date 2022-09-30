import { Injectable } from '@nestjs/common';
import { GeneratorMenuOptions } from './domain/types';
import { InquirerService } from 'nest-commander';
import { Tool } from '../../shared/types';

@Injectable()
export class GeneratorService {
  constructor(private readonly inquirerService: InquirerService) {}
  async showGeneratorMenu(options: GeneratorMenuOptions) {
    options &&= await this.inquirerService.ask<GeneratorMenuOptions>(
      Tool.GENERATOR,
      options,
    );

    await this.generateSchema(options);
  }

  async generateSchema(options: GeneratorMenuOptions) {
    console.log(options);
    console.log('Generating Schema');
  }

  async saveFile() {
    //
  }

  async renderTemplate() {
    //
  }
}
