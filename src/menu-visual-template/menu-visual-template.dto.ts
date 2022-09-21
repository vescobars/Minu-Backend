import { IsNotEmpty, IsString } from 'class-validator';
export class MenuVisualTemplateDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly file: string;
}
