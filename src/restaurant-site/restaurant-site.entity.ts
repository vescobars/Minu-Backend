import { AddressEntity } from 'src/address/address.entity';
import { MenuEntity } from 'src/menu/menu.entity';
import { OrderEntity } from 'src/order/order.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { TableEntity } from 'src/table/table.entity';
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

  @OneToMany(
    () => RestaurantOperatorEntity,
    (restaurantOperator) => restaurantOperator.restaurantSite,
  )
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
