import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { SiteScheduleController } from './site-schedule.controller';
import { SiteScheduleService } from './site-schedule.service';

@Module({
  providers: [SiteScheduleService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, ScheduleEntity])],
  controllers: [SiteScheduleController],
})
export class SiteScheduleModule {}
