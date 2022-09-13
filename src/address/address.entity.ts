import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoordinateEntity } from '../coordinate/coordinate.entity';

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

  @OneToOne(() => CoordinateEntity, (coordinate) => coordinate.address)
  @JoinColumn()
  coordinate: CoordinateEntity;

  @OneToOne(() => RestaurantSiteEntity, (restaurantSite) => restaurantSite.address)
  restaurantSite: RestaurantSiteEntity;
}
