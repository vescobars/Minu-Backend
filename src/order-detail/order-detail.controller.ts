import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { OrderDetailDto } from './order-detail.dto';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderDetailController {
    constructor(private readonly orderDetailService:OrderDetailService){}
    
    @Get()
    async findAll() {
        return await this.orderDetailService.findAll();
    }

    @Get(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId')
    async findOne(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.findOne(orderDetailId);
    }

    @Post()
    async create(@Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.create(orderDetail);
    }

    @Put(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId')
    async update(@Param('orderDetailId') orderDetailId: string, @Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.update(orderDetailId, orderDetail);
    }

    @Delete(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId')
    @HttpCode(204)
    async delete(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.delete(orderDetailId);
    }
}
