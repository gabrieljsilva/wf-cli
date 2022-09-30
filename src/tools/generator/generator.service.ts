import { Injectable } from '@nestjs/common';
import { GeneratorMenuOptions } from './domain/types';

@Injectable()
export class GeneratorService {
  async showGeneratorMenu(options: Partial<GeneratorMenuOptions>) {
    console.log(options);
    console.log('Showing generator menu');
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
