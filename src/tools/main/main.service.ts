import { Injectable } from '@nestjs/common';
import { Tool } from '../../shared/types';

@Injectable()
export class MainService {
  showMainMenu() {
    console.log('Showing main menu');
  }

  executeToolCLI(tool: Tool) {
    console.log(`executing ${tool} commander`);
  }
}
