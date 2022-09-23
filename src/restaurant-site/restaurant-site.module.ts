import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';
import { RestaurantSiteController } from './restaurant-site.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity])],
  providers: [RestaurantSiteService],
  controllers: [RestaurantSiteController]
})
export class RestaurantSiteModule {}
