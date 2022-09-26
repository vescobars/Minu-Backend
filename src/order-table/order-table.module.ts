import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from '../table/table.entity';
import { OrderEntity } from '../order/order.entity';
import { OrderService } from '../order/order.service';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity,TableEntity])],
  providers: [OrderTableService],
  controllers: [OrderTableController]
})
export class OrderTableModule {}
