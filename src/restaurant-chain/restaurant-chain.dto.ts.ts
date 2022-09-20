import {IsNotEmpty, IsString, IsUrl} from 'class-validator';

export class RestaurantChainDtoTs {
    @IsString()
    @IsNotEmpty()
    readonly chainName: string;
}
