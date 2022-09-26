import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { OrderDetailPlatesController } from './order-detail-plates.controller';
import { PlateEntity } from '../plate/plate.entity';
import { OrderDetailPlatesService } from './order-detail-plates.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity,PlateEntity])],
  providers: [OrderDetailPlatesService],
  controllers: [OrderDetailPlatesController]
})
export class OrderDetailPlatesModule {}
