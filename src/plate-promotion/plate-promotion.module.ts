import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateEntity } from 'src/plate/plate.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { PlatePromotionService } from './plate-promotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlateEntity, PromotionEntity])],
  providers: [PlatePromotionService],
})
export class PlatePromotionModule {}
