import {IsDate, IsNotEmpty, IsString} from 'class-validator';
export class MenuDto {
  @IsDate()
  @IsNotEmpty()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  readonly file: string;

}