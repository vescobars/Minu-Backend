import { Module } from '@nestjs/common';
import { PlatePromotionService } from './plate-promotion.service';
import { PlatePromotionController } from './plate-promotion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from '../promotion/promotion.entity';
import { PlateEntity } from '../plate/plate.entity';

@Module({
  providers: [PlatePromotionService],
  controllers: [PlatePromotionController],
  imports: [TypeOrmModule.forFeature([PromotionEntity, PlateEntity])],
})
export class PlatePromotionModule {}
