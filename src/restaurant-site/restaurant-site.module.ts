import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity])],
  providers: [RestaurantSiteService]
})
export class RestaurantSiteModule {}
