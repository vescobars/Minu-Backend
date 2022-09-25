import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { OrderEntity } from './order.entity';
import { plainToInstance } from 'class-transformer';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderController {
    constructor(private readonly orderService:OrderService){}
    
    @Get(':chainId/sites/:siteId/orders')
    async findAll() {
      return await this.orderService.findAll();
    }

    @Get(':chainId/sites/:siteId/orders/:orderId')
    async findOne(@Param('orderId') orderId:string){
        return await this.orderService.findOne(orderId);
    }

    @Post(':chainId/sites/:siteId/orders')
    async create(@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        return await this.orderService.create(order);
    }

    @Put(':chainId/sites/:siteId/orders/:orderId')
    async update(@Param('orderId') orderId:string,@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        return await this.orderService.update(orderId,order);
    }

    @Delete(':chainId/sites/:siteId/orders/:orderId')
    async delete(@Param('orderId') orderId:string){
        return await this.orderService.delete(orderId);
    }

}
