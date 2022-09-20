import { Module } from '@nestjs/common';
import { OrderPayModeService } from './order-pay-mode.service';

@Module({
  providers: [OrderPayModeService]
})
export class OrderPayModeModule {}
