import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class PlateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    notes: string;
}
