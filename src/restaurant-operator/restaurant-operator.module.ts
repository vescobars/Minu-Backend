import { Module } from '@nestjs/common';
import { RestaurantOperatorService } from './restaurant-operator.service';
import { RestaurantOperatorEntity } from './restaurant-operator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([RestaurantOperatorEntity])],
  providers: [RestaurantOperatorService],
})
export class RestaurantOperatorModule {}
