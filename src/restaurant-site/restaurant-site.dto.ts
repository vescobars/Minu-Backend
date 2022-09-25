import { IsNotEmpty, IsString } from "class-validator";

export class RestaurantSiteDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}
