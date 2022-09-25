import { Module } from '@nestjs/common';
import { PlatePromotionService } from './plate-promotion.service';
import { PlatePromotionController } from './plate-promotion.controller';

@Module({
  providers: [PlatePromotionService],
  controllers: [PlatePromotionController]
})
export class PlatePromotionModule {}
