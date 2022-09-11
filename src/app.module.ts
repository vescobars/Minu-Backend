import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PromotionModule } from './promotion/promotion.module';
import { PlateModule } from './plate/plate.module';
import { DescriptionTahModule } from './description-tah/description-tah.module';
import { DescriptionTagModule } from './description-tag/description-tag.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [CategoryModule, PromotionModule, PlateModule, DescriptionTahModule, DescriptionTagModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
