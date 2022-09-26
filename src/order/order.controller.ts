import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { OrderEntity } from './order.entity';
import { plainToInstance } from 'class-transformer';
import { HttpCode } from '@nestjs/common/decorators';

@Controller('orders')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderController {
    constructor(private readonly orderService:OrderService){}
    
    @Get()
    async findAll() {
      return await this.orderService.findAll();
    }

    @Get(':orderId')
    async findOne(@Param('orderId') orderId:string){
        return await this.orderService.findOne(orderId);
    }

    @Post()
    async create(@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        order.date = new Date(order.date);
        return await this.orderService.create(order);
    }

    @Put(':orderId')
    async update(@Param('orderId') orderId:string,@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        return await this.orderService.update(orderId,order);
    }

    @Delete(':orderId')
    @HttpCode(204)
    async delete(@Param('orderId') orderId:string){
        return await this.orderService.delete(orderId);
    }

}