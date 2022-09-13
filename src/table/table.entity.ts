import { OrderEntity } from 'src/order/order.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TableEntity {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    seats:number;

    @Column()
    number:number;

    @Column()
    occupied:boolean;

    @OneToOne(() => OrderEntity, order => order.table)
    order: OrderEntity;

    @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.tables)
    restaurantSite: RestaurantSiteEntity;
}
