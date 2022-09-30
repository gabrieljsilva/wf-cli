import { CommandFactory } from 'nest-commander';
import { MainModule } from './tools';

async function bootstrap() {
  await CommandFactory.run(MainModule);
}

bootstrap();
