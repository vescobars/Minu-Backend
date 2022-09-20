import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class RestaurantChainDto{
    @IsString()
    @IsNotEmpty()
    readonly chainName: string;
}
