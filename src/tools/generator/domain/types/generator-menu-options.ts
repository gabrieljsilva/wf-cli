import { IsNotEmpty, IsString, IsNotIn, IsOptional } from 'class-validator';

const generatorInvalidOptions = ['-s', '-m', '-p', '-s ', '-m ', '-p '];

export class GeneratorMenuOptions {
  @IsString()
  @IsNotEmpty()
  @IsNotIn(generatorInvalidOptions)
  @IsOptional()
  packageName: string;

  @IsString()
  @IsNotIn(generatorInvalidOptions)
  @IsNotEmpty()
  @IsOptional()
  moduleName: string;

  @IsString()
  @IsNotIn(generatorInvalidOptions)
  @IsNotEmpty()
  @IsOptional()
  schematic: string;
}
