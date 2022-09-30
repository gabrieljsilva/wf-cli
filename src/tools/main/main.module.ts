import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { MainCommander } from './main.commander';

@Module({
  imports: [],
  providers: [MainService, MainCommander],
})
export class MainModule {}
