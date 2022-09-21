import {IsString } from "class-validator";

export class OrderDetailDto {
    @IsString()
    notes: string;
}
