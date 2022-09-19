import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site';

@Module({})
export class RestaurantSiteModule {}
