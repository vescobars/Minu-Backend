import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  direction: string;

  @OneToOne(() => RestaurantSiteEntity,(restaurantSite) => restaurantSite.address)
  restaurantSite: RestaurantSiteEntity;
}
