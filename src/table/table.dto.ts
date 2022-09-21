import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class TableDto {
    @IsNumber()
    @IsNotEmpty()
    seats:number;

    @IsNumber()
    @IsNotEmpty()
    number:number;

    @IsBoolean()
    @IsNotEmpty()
    occupied:boolean;
}
