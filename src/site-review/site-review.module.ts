import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ReviewEntity } from '../review/review.entity';
import { SiteReviewService } from './site-review.service';

@Module({
  providers: [SiteReviewService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, ReviewEntity])]
})
export class SiteReviewModule {}
