import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantChainService } from './restaurant-chain.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantChainController {
    constructor(private readonly chainService:RestaurantChainService){}

}
