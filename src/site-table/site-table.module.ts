import { Module } from '@nestjs/common';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { TableEntity } from '../table/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteTableService } from './site-table.service';
import { SiteTableController } from './site-table.controller';

@Module({
  providers: [SiteTableService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, TableEntity])],
  controllers: [SiteTableController]
})
export class SiteTableModule {}
