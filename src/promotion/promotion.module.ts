import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionEntity } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Module({
  imports: [TypeOrmModule.forFeature([PromotionEntity])],
  providers: [PromotionService]
})
export class PromotionModule {}
