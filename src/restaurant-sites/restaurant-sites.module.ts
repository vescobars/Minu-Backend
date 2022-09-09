import { Module } from '@nestjs/common';
import { RestaurantSitesService } from './restaurant-sites.service';
import { RestaurantSitesController } from './restaurant-sites.controller';

@Module({
  controllers: [RestaurantSitesController],
  providers: [RestaurantSitesService]
})
export class RestaurantSitesModule {}
