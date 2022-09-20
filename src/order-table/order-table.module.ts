import { Module } from '@nestjs/common';
import { OrderTableService } from './order-table.service';

@Module({
  providers: [OrderTableService]
})
export class OrderTableModule {}
