import { IsNotEmpty, IsString, IsNotIn, IsOptional } from 'class-validator';

const invalidEntries = ['-s', '-m', '-p', '-s ', '-m ', '-p '];

export class GeneratorMenuOptions {
  @IsString()
  @IsNotEmpty()
  @IsNotIn(invalidEntries)
  @IsOptional()
  packageName: string;

  @IsString()
  @IsNotIn(invalidEntries)
  @IsNotEmpty()
  @IsOptional()
  moduleName: string;

  @IsString()
  @IsNotIn(invalidEntries)
  @IsNotEmpty()
  @IsOptional()
  schematic: string;
}
