import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantChainsService } from './restaurant-chains.service';
import { CreateRestaurantChainDto } from './dto/create-restaurant-chain.dto';
import { UpdateRestaurantChainDto } from './dto/update-restaurant-chain.dto';

@Controller('restaurant-chains')
export class RestaurantChainsController {
  constructor(private readonly restaurantChainsService: RestaurantChainsService) {}

  @Post()
  create(@Body() createRestaurantChainDto: CreateRestaurantChainDto) {
    return this.restaurantChainsService.create(createRestaurantChainDto);
  }

  @Get()
  findAll() {
    return this.restaurantChainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantChainsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantChainDto: UpdateRestaurantChainDto) {
    return this.restaurantChainsService.update(+id, updateRestaurantChainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantChainsService.remove(+id);
  }
}
