import { Module } from '@nestjs/common';
import { RestaurantChainsService } from './restaurant-chains.service';
import { RestaurantChainsController } from './restaurant-chains.controller';

@Module({
  controllers: [RestaurantChainsController],
  providers: [RestaurantChainsService]
})
export class RestaurantChainsModule {}
