import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { OrderEntity } from '../order/order.entity';
import { ClientOrderController } from './client-order.controller';
import { ClientOrderService } from './client-order.service';

@Module({
  providers: [ClientOrderService],
  imports: [TypeOrmModule.forFeature([ClientEntity, OrderEntity])],
  controllers: [ClientOrderController],
})
export class ClientOrderModule {}
