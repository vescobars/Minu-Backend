import { ClientEntity } from 'src/client/client.entity';
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';
import { PayModeEntity } from 'src/pay-mode/pay-mode.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { TableEntity } from 'src/table/table.entity';
import {
  OneToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @Column()
  date: Date;

  @Column()
  totalValue: number;

  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetailEntity;

  @OneToOne(() => PayModeEntity, (payMode) => payMode.order)
  @JoinColumn()
  payMode: PayModeEntity;

  @OneToOne(() => TableEntity, (table) => table.order)
  @JoinColumn()
  table: TableEntity;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client: ClientEntity;

  @ManyToOne(() => RestaurantSiteEntity, (restaurantSite) => restaurantSite.orders)
  restaurantSite: RestaurantSiteEntity;
}
