import { IsNotEmpty, IsNumber } from 'class-validator';
export class CoordinateDto {
  @IsNumber()
  @IsNotEmpty()
  readonly length: number;

  @IsNumber()
  @IsNotEmpty()
  readonly latitude: number;
}
