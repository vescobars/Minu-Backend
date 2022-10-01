import { Module } from '@nestjs/common';
import { RestaurantOperatorService } from './restaurant-operator.service';
import { RestaurantOperatorEntity } from './restaurant-operator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantOperatorController } from './restaurant-operator.controller';


@Module({
  imports: [TypeOrmModule.forFeature([RestaurantOperatorEntity])],
  providers: [RestaurantOperatorService],
  controllers: [RestaurantOperatorController],
})
export class RestaurantOperatorModule {}
