import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
//import { OrderDetailPlatesController } from './order-detail-plates.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  providers: [OrderDetailService],
  //controllers: [OrderDetailPlatesController]
})
export class OrderDetailPlatesModule {}
