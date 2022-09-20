import { Module } from '@nestjs/common';
import { OrderDetailPlatesService } from './order-detail-plates.service';

@Module({
  providers: [OrderDetailPlatesService]
})
export class OrderDetailPlatesModule {}
