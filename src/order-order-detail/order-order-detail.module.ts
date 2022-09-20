import { Module } from '@nestjs/common';
import { OrderOrderDetailService } from './order-order-detail.service';

@Module({
  providers: [OrderOrderDetailService]
})
export class OrderOrderDetailModule {}
