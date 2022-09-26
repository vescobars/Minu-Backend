import { PlateEntity } from '../plate/plate.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class PromotionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    discount: number;

    @Column()
    description: string;

    @OneToOne(() => PlateEntity, plate => plate.promotion)
    plate: PlateEntity;

    @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.promotions)
    restaurantSite: RestaurantSiteEntity;
}