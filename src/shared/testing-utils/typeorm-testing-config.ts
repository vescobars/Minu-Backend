import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../../order-detail/order-detail.entity';
import { OrderEntity } from '../../order/order.entity';
import { TableEntity } from '../../table/table.entity';
import { PayModeEntity } from '../../pay-mode/pay-mode.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'minu',
  dropSchema: true,
  entities: [PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity],
  synchronize: true,
  logging: false,
  keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity]),
];