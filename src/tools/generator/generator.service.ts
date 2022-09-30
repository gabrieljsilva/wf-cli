import { Injectable } from '@nestjs/common';
import { GeneratorMenuOptions } from './domain/types/generator-menu-options.interface';

@Injectable()
export class GeneratorService {
  async showGeneratorMenu(options: Partial<GeneratorMenuOptions>) {
    console.log('Showing generator menu');
  }

  async generateSchema(options: GeneratorMenuOptions) {
    console.log('Generating Schema');
  }

  async saveFile() {
    //
  }

  async renderTemplate() {
    //
  }
}
