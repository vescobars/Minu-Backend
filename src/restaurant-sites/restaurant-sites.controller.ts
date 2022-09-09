import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestaurantSitesService } from './restaurant-sites.service';
import { CreateRestaurantSiteDto } from './dto/create-restaurant-site.dto';
import { UpdateRestaurantSiteDto } from './dto/update-restaurant-site.dto';

@Controller('restaurant-sites')
export class RestaurantSitesController {
  constructor(private readonly restaurantSitesService: RestaurantSitesService) {}

  @Post()
  create(@Body() createRestaurantSiteDto: CreateRestaurantSiteDto) {
    return this.restaurantSitesService.create(createRestaurantSiteDto);
  }

  @Get()
  findAll() {
    return this.restaurantSitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantSitesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantSiteDto: UpdateRestaurantSiteDto) {
    return this.restaurantSitesService.update(+id, updateRestaurantSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantSitesService.remove(+id);
  }
}
