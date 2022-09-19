import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../address/address.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { SiteAddressService } from './site-address.service';

@Module({
  providers: [SiteAddressService],
  imports: [TypeOrmModule.forFeature([RestaurantSiteEntity, AddressEntity])]
})
export class SiteAddressModule {}
