import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SiteMenuService } from './site-menu.service';
import { SiteMenuController } from './site-menu.controller';

@Module({
  providers: [SiteMenuService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, MenuEntity])],
  controllers: [SiteMenuController]
})
export class SiteMenuModule {}
