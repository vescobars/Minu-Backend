import { Controller } from '@nestjs/common';
import { RestaurantChainService } from './restaurant-chain.service';

@Controller('chains')
export class RestaurantChainController {
    constructor(private readonly chainService:RestaurantChainService){}
    
}
