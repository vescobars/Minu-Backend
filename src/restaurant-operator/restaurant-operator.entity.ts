import { ImageEntity } from 'src/image/image.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
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

    @OneToOne(() => ImageEntity, image => image.restaurantOperator)
    @JoinColumn()
    profile_image: ImageEntity;

    @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.restaurantOperators)
    restaurantSite: RestaurantSiteEntity;

}
