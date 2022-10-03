import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';

import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { CategoryEntity } from '../category/category.entity';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file: string;

  @Column()
  date: Date;

  @OneToMany(() => CategoryEntity, (categories) => categories.menu)
  categories: CategoryEntity[];

  @OneToOne(
    () => RestaurantSiteEntity,
    (restaurantSite) => restaurantSite.menu,
  )
  restaurantSite: RestaurantSiteEntity;
}
