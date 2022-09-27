import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @IsNumber()
  @IsNotEmpty()
  readonly totalValue: number;
}
