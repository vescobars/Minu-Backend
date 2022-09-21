import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class OrderDto {
  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly totalValue: number;
}
