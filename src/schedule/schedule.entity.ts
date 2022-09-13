import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  opening_hour: string;

  @Column()
  closing_hour: string;

  @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.schedules)
  restaurantSite: RestaurantSiteEntity;

}
