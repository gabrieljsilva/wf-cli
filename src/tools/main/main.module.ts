import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainCommander } from './main.commander';
import { MainMenu } from './main.menu';
import { GeneratorModule } from '../generator';

@Module({
  imports: [GeneratorModule],
  providers: [MainService, MainCommander, MainMenu],
})
export class MainModule {}
