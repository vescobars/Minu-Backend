import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { OrderDetailDto } from './order-detail.dto';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Controller('orderDetails')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderDetailController {
    constructor(private readonly orderDetailService:OrderDetailService){}
    
    @Get()
    async findAll() {
        return await this.orderDetailService.findAll();
    }

    @Get(':orderDetailId')
    async findOne(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.findOne(orderDetailId);
    }

    @Post()
    async create(@Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.create(orderDetail);
    }

    @Put(':orderDetailId')
    async update(@Param('orderDetailId') orderDetailId: string, @Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.update(orderDetailId, orderDetail);
    }

    @Delete(':orderDetailId')
    @HttpCode(204)
    async delete(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.delete(orderDetailId);
    }
}
