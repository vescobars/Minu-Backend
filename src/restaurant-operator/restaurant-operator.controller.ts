
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantOperatorDto } from './restaurant-operator.dto';
import { RestaurantOperatorEntity } from './restaurant-operator.entity';
import { RestaurantOperatorService } from './restaurant-operator.service';

@Controller('restaurantOperators')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantOperatorController {
    constructor(private readonly restaurantOperatorService: RestaurantOperatorService) {}

  @Get()
  async findAll() {
    return await this.restaurantOperatorService.findAll();
  }

  @Get(':restaurantOperatorId')
  async findOne(@Param('restaurantOperatorId') restaurantOperatorId: string) {
    return await this.restaurantOperatorService.findOne(restaurantOperatorId);
  }

  @Post()
  async create(@Body() restaurantOperatorDto: RestaurantOperatorDto) {
    const restaurantOperator: RestaurantOperatorEntity = plainToInstance(RestaurantOperatorEntity, restaurantOperatorDto);
    return await this.restaurantOperatorService.create(restaurantOperator);
  }

  @Put(':restaurantOperatorId')
  async update(@Param('restaurantOperatorId') restaurantOperatorId: string, @Body() restaurantOperatorDto: RestaurantOperatorDto) {
    const restaurantOperator: RestaurantOperatorEntity = plainToInstance(RestaurantOperatorEntity, restaurantOperatorDto);
    return await this.restaurantOperatorService.update(restaurantOperatorId, restaurantOperator);
  }

  @Delete(':restaurantOperatorId')
  @HttpCode(204)
  async delete(@Param('restaurantOperatorId') restaurantOperatorId: string) {
    return await this.restaurantOperatorService.delete(restaurantOperatorId);
  }

}
