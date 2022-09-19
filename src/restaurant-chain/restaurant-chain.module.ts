import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantChainEntity])],
  providers: [RestaurantChainService]
})
export class RestaurantChainModule {}
