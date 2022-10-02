import { ImageEntity } from '../image/image.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantOperatorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstname:string

    @Column()
    cellphone:string

    @Column()
    lastname:string

    @Column()
    email:string

    @Column()
    role:string

    @Column()
    active:boolean

    @Column()
    imageUrl:string

    @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.restaurantOperators)
    restaurantSite: RestaurantSiteEntity;

}
