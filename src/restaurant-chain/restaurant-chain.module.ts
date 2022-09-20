import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';
import { RestaurantChainController } from './restaurant-chain.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantChainEntity])],
  providers: [RestaurantChainService],
  controllers: [RestaurantChainController]
})
export class RestaurantChainModule {}
