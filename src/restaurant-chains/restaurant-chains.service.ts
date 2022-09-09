import { Injectable } from '@nestjs/common';
import { CreateRestaurantChainDto } from './dto/create-restaurant-chain.dto';
import { UpdateRestaurantChainDto } from './dto/update-restaurant-chain.dto';

@Injectable()
export class RestaurantChainsService {
  create(createRestaurantChainDto: CreateRestaurantChainDto) {
    return 'This action adds a new restaurantChain';
  }

  findAll() {
    return `This action returns all restaurantChains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantChain`;
  }

  update(id: number, updateRestaurantChainDto: UpdateRestaurantChainDto) {
    return `This action updates a #${id} restaurantChain`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantChain`;
  }
}
