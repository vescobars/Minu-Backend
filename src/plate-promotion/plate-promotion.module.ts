import { Module } from '@nestjs/common';
import { PlatePromotionService } from './plate-promotion.service';

@Module({
  providers: [PlatePromotionService]
})
export class PlatePromotionModule {}
