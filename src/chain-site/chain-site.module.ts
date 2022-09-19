import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantChainEntity } from '../restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ChainSiteService } from './chain-site.service';

@Module({
  providers: [ChainSiteService],
  imports: [TypeOrmModule.forFeature([RestaurantChainEntity, RestaurantSiteEntity])]
})
export class ChainSiteModule {}
