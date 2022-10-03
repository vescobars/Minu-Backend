import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../order/order.entity';
import { OrderOrderDetailController } from './order-order-detail.controller';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { OrderOrderDetailService } from './order-order-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderDetailEntity])],
  providers: [OrderOrderDetailService],
  controllers: [OrderOrderDetailController],
})
export class OrderOrderDetailModule {}
