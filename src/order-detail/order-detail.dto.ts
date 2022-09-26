import {IsString } from "class-validator";

export class OrderDetailDto {
    @IsString()
    readonly notes: string;
}
