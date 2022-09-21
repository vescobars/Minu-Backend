import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    @IsNotEmpty()
    state: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsNumber()
    @IsNotEmpty()
    totalValue: number;
}
