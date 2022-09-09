import { Injectable } from '@nestjs/common';
import { CreateRestaurantSiteDto } from './dto/create-restaurant-site.dto';
import { UpdateRestaurantSiteDto } from './dto/update-restaurant-site.dto';

@Injectable()
export class RestaurantSitesService {
  create(createRestaurantSiteDto: CreateRestaurantSiteDto) {
    return 'This action adds a new restaurantSite';
  }

  findAll() {
    return `This action returns all restaurantSites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantSite`;
  }

  update(id: number, updateRestaurantSiteDto: UpdateRestaurantSiteDto) {
    return `This action updates a #${id} restaurantSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantSite`;
  }
}
