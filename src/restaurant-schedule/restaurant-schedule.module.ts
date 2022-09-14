import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { RestaurantScheduleService } from './restaurant-schedule.service';

@Module({
  providers: [RestaurantScheduleService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, ScheduleEntity])],
})
export class RestaurantScheduleModule {}
