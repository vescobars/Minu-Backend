import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ChainSiteService } from './chain-site.service';

@Module({
  providers: [ChainSiteService],
  imports: [TypeOrmModule.forFeature([RestaurantChainEntity, RestaurantSiteEntity])]
})
export class ChainSiteModule {}
