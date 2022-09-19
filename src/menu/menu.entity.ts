import { MenuVisualTemplateEntity } from '../menu-visual-template/menu-visual-template.entity';
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
import { MenuVisualPreferenceEntity } from '../menu-visual-preferences/menu-visual-preferences.entity';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToMany(() => CategoryEntity, (categories) => categories.menu)
  categories: CategoryEntity[];

  @OneToOne(() => RestaurantSiteEntity, (restaurantSite) => restaurantSite.menu)
  restaurantSite: RestaurantSiteEntity;

  @OneToOne(
    () => MenuVisualTemplateEntity,
    (MenuVisualTemplate) => MenuVisualTemplate.menu,
  )
  @JoinColumn()
  menuVisualTemplate: MenuVisualTemplateEntity;

  @OneToOne(
    () => MenuVisualPreferenceEntity,
    (menuVisualPreferences) => menuVisualPreferences.menu,
  )
  @JoinColumn()
  menuVisualPreferences: MenuVisualPreferenceEntity;
}
