import { OrderEntity } from 'src/order/order.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
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

    /*
    @OneToOne(() => MenuEntity, menu => menu.restaurantChain)
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
    */
}
