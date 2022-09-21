import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../order/order.service';
import { OrderEntity } from '../order/order.entity';
//import { OrderOrderDetailController } from './order-order-detail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService],
  //controllers: [OrderOrderDetailController]
})
export class OrderOrderDetailModule {}
