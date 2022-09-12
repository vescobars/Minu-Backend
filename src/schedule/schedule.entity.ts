import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  opening_hour: string;

  @Column()
  closing_hour: string;

  @ManyToOne(() => RestaurantSiteEntity, restaurantSite => restaurantSite.schedule)
  restaurantSite: RestaurantSiteEntity;

}
