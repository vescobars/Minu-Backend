import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import { OrderPayModeService } from './order-pay-mode.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService]
})
export class OrderPayModeModule {}
