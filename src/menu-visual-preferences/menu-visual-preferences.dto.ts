import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class MenuVisualPreferencesDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    file: string;
}
