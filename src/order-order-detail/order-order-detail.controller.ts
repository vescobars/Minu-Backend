import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderDetailDto } from '../order-detail/order-detail.dto';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderOrderDetailService } from './order-order-detail.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderOrderDetailController {
    constructor(private readonly orderOrderDetailService: OrderOrderDetailService){}

    @Post(':siteId/orders/:orderId/orderDetails/:orderDetailId')
    async addOrderDetailOrder(@Param('orderId') orderId: string, @Param('orderDetailId') orderDetailId: string){
       return await this.orderOrderDetailService.addOrderDetailOrder(orderId, orderDetailId);
    }

    @Get(':siteId/orders/:orderId/orderDetails/:orderDetailId')
    async findOrderDetailByOrderIdOrderDetailId(@Param('orderId') orderId: string, @Param('orderDetailId') orderDetailId: string){
       return await this.orderOrderDetailService.findOrderDetailByOrderIdOrderDetailId(orderId, orderDetailId);
    }

    @Get(':siteId/orders/:orderId/orderDetails')
    async findOrderDetailByOrderId(@Param('orderId') orderId: string){
       return await this.orderOrderDetailService.findOrderDetailByOrderId(orderId);
    }

    @Put(':siteId/orders/:orderId/orderDetails')
    async associateOrderDetailOrder(@Body() orderDetailDto: OrderDetailDto, @Param('orderId') orderId: string){
       const orderDetails = plainToInstance(OrderDetailEntity, orderDetailDto)
       return await this.orderOrderDetailService.associateOrderDetailOrder(orderId, orderDetails);
    }

    @Delete(':siteId/orders/:orderId/orderDetails/:orderDetailId')
    @HttpCode(204)
    async deleteOrderDetailOrder(@Param('orderId') orderId: string, @Param('orderDetailId') orderDetailId: string){
       return await this.orderOrderDetailService.deleteOrderDetailOrder(orderId, orderDetailId);
    }
}
