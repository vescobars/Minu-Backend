import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../../order-detail/order-detail.entity';
import { OrderEntity } from '../../order/order.entity';
import { TableEntity } from '../../table/table.entity';
import { PayModeEntity } from '../../pay-mode/pay-mode.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   //entities: [PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity],
   entities: [PayModeEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 //TypeOrmModule.forFeature([PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity]),
 TypeOrmModule.forFeature([PayModeEntity]),
];