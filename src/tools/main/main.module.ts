import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainCommander } from './main.commander';
import { MainMenu } from './main.menu';
import { GeneratorModule } from '../generator';
import { ScaffolderModule } from '../scaffolder';

@Module({
  imports: [GeneratorModule, ScaffolderModule],
  providers: [MainService, MainCommander, MainMenu],
})
export class MainModule {}
