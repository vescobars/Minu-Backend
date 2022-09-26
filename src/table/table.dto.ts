import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class TableDto {
    @IsNumber()
    @IsNotEmpty()
    readonly seats:number;

    @IsNumber()
    @IsNotEmpty()
    readonly number:number;

    @IsBoolean()
    @IsNotEmpty()
    readonly occupied:boolean;
}
