import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
//import { OrderTableController } from './order-table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService],
  //controllers: [OrderTableController]
})
export class OrderTableModule {}
