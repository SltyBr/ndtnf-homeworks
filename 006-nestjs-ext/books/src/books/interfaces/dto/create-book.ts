import { IsString, MinLength } from 'class-validator';

export class CreateBookDto {
  @MinLength(3)
  @IsString()
  name: string;

  @IsString()
  author: string;
}
