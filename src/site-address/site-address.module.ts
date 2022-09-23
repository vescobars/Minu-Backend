import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../address/address.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SiteAddressService } from './site-address.service';
import { SiteAddressController } from './site-address.controller';

@Module({
  providers: [SiteAddressService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, AddressEntity])],
  controllers: [SiteAddressController]
})
export class SiteAddressModule {}
