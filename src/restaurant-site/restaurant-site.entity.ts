import { AddressEntity } from '../address/address.entity';
import { MenuEntity } from '../menu/menu.entity';
import { OrderEntity } from '../order/order.entity';
import { PromotionEntity } from '../promotion/promotion.entity';
import { RestaurantChainEntity } from '../restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';
import { ReviewEntity } from '../review/review.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { TableEntity } from '../table/table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RestaurantSiteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(
    () => RestaurantChainEntity,
    (restaurantChain) => restaurantChain.restaurantSites,
  )
  restaurantChain: RestaurantChainEntity;

  @OneToMany(() => OrderEntity, (orders) => orders.restaurantSite)
  orders: OrderEntity[];

  @OneToMany(() => TableEntity, (tables) => tables.restaurantSite)
  tables: TableEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.restaurantSite)
  reviews: ReviewEntity[];

  @OneToMany(() => RestaurantOperatorEntity,(restaurantOperators) => restaurantOperators.restaurantSite)
  restaurantOperators: RestaurantOperatorEntity[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.restaurantSite)
  schedules: ScheduleEntity[];

  @OneToMany(() => PromotionEntity, (promotion) => promotion.restaurantSite)
  promotions: PromotionEntity[];

  @OneToOne(() => MenuEntity, (menu) => menu.restaurantSite)
  @JoinColumn()
  menu: MenuEntity;

  @OneToOne(() => AddressEntity, (address) => address.restaurantSite)
  @JoinColumn()
  address: AddressEntity;
}
