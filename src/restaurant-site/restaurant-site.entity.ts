import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantSiteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    description: String;

    @ManyToOne(() => RestaurantChainEntity, restaurantChain => restaurantChain.restaurantSites)
    restaurantChain: RestaurantChainEntity;

    /*
    @OneToOne(() => MenuEntity, menu => menu.restaurantChain)
    @JoinColumn()
    menu: MenuEntity;

    @OneToMany(() => TableEntity, table => table.restaurantSite)
    tables: TableEntity[];

    @OneToMany(() => OrderEntity, order => order.restaurantSite)
    orders: OrderEntity[];

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
