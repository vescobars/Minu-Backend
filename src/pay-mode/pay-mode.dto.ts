import { IsNotEmpty, IsString } from "class-validator";

export class PayModeDto {
    @IsString()
    @IsNotEmpty()
    readonly type:string;
}
