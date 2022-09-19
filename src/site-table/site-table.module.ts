import { Module } from '@nestjs/common';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { TableEntity } from '../table/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteTableService } from './site-table.service';

@Module({
  providers: [SiteTableService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, TableEntity])]
})
export class SiteTableModule {}
