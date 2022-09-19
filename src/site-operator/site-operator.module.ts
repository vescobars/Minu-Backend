import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { SiteOperatorService } from './site-operator.service';

@Module({
  providers: [SiteOperatorService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, RestaurantOperatorEntity])]
})
export class SiteOperatorModule {}
