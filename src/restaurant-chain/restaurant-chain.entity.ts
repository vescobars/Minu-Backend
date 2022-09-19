import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';

@Entity()
export class RestaurantChainEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    chainName: string;

    @OneToMany(() => RestaurantSiteEntity, restaurantSite => restaurantSite.restaurantChain)
    restaurantSites: RestaurantSiteEntity[];


}