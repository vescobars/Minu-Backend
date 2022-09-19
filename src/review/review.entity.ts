import { ClientEntity } from '../client/client.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @Column()
    description: string;

    @ManyToOne(() => ClientEntity, client => client.reviews)
    client: ClientEntity;

    @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.reviews)
    restaurantSite: RestaurantSiteEntity[];

}