import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import { OrderPayModeService } from './order-pay-mode.service';
import { OrderPayModeController } from './order-pay-mode.controller';
import { PayModeEntity } from '../pay-mode/pay-mode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity,PayModeEntity])],
  providers: [OrderPayModeService],
  controllers: [OrderPayModeController]
})
export class OrderPayModeModule {}
