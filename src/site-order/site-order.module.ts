import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SiteOrderService } from './site-order.service';
import { SiteOrderController } from './site-order.controller';

@Module({
  providers: [SiteOrderService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, OrderEntity])],
  controllers: [SiteOrderController]
})
export class SiteOrderModule {}
