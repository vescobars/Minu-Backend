import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  totalValue: number;
}
