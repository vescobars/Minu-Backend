import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import { OrderPayModeService } from './order-pay-mode.service';
//import { OrderPayModeController } from './order-pay-mode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService],
  //controllers: [OrderPayModeController]
})
export class OrderPayModeModule {}
