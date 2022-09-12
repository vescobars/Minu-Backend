import { AddressEntity } from 'src/address/address.entity';
import { MenuEntity } from 'src/menu/menu.entity';
import { OrderEntity } from 'src/order/order.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { TableEntity } from 'src/table/table.entity';
import { Column, Entity, JoinColumn, ManyToOne,OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantSiteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    description: String;

    @ManyToOne(() => RestaurantChainEntity, restaurantChain => restaurantChain.restaurantSites)
    restaurantChain: RestaurantChainEntity;

    @OneToMany(() => OrderEntity, orders => orders.restaurantSite)
    orders: OrderEntity[];

    @OneToMany(() => TableEntity, tables => tables.restaurantSite)
    tables: TableEntity[];

    @OneToOne(() => MenuEntity, menu => menu.restaurantSite)
    @JoinColumn()
    menu: MenuEntity;

    @OneToMany(() => ReviewEntity, review => review.restaurantSite)
    reviews: ReviewEntity[];

    @OneToMany(() => RestaurantOperatorEntity, restaurantOperator => restaurantOperator.restaurantSite)
    restaurantOperators: RestaurantOperatorEntity[];

    @OneToOne(() => AddressEntity, address => address.restaurantSite)
    @JoinColumn()
    address: AddressEntity;

    @OneToOne(() => ScheduleEntity, schedule => schedule.restaurantSite)
    @JoinColumn()
    schedule: ScheduleEntity;

    @OneToMany(() => PromotionEntity, promotion => promotion.restaurantSite)
    promotions: PromotionEntity[];
   
}
