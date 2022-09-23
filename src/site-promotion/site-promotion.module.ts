import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from '../promotion/promotion.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SitePromotionService } from './site-promotion.service';
import { SitePromotionController } from './site-promotion.controller';

@Module({
  providers: [SitePromotionService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, PromotionEntity])],
  controllers: [SitePromotionController]
})
export class SitePromotionModule {}
