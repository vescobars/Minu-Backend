import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ClientOrderService } from './client-order.service';

@Module({
  providers: [ClientOrderService],
  imports: [TypeOrmModule.forFeature([ClientEntity, OrderEntity])],
})
export class ClientOrderModule {}
