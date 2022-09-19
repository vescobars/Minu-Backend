import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SiteMenuService } from './site-menu.service';

@Module({
  providers: [SiteMenuService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, MenuEntity])]
})
export class SiteMenuModule {}
