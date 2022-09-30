import { Injectable } from '@nestjs/common';
import { Tool } from '../../shared/types';
import { InquirerService } from 'nest-commander';

@Injectable()
export class MainService {
  constructor(private readonly inquirerService: InquirerService) {}

  async showMainMenu() {
    const result = await this.inquirerService.ask(Tool.MAIN, {});
    console.log(result);
  }

  async executeToolCLI(tool: Tool) {
    console.log(`executing ${tool} commander`);
  }
}
