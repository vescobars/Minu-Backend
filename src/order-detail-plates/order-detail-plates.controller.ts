import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PlateDto } from '../plate/plate.dto';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderDetailPlatesService } from './order-detail-plates.service';

@Controller('orders')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderDetailPlatesController {
    constructor(private readonly orderDetailPlatesService: OrderDetailPlatesService){}

    @Post(':orderId/orderDetails/:orderDetailId/plates/:plateId')
    async addPlateOrderDetail(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.addPlateOrderDetail(orderDetailId, plateId);
    }

    @Get(':orderId/orderDetails/:orderDetailId/plates/:plateId')
    async findPlateByOrderDetailIdPlateId(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.findPlateByOrderDetailIdPlateId(orderDetailId, plateId);
    }

    @Get(':orderId/orderDetails/:orderDetailId/plates')
    async findPlatesByOrderDetailId(@Param('orderDetailId') orderDetailId: string){
       return await this.orderDetailPlatesService.findPlatesByOrderDetailId(orderDetailId);
    }

    @Put(':orderId/orderDetails/:orderDetailId/plates')
    async associatePlatesOrderDetail(@Body() platesDto: PlateDto[], @Param('orderDetailId') orderDetailId: string){
       const plates = plainToInstance(PlateEntity, platesDto)
       return await this.orderDetailPlatesService.associatePlatesOrderDetail(orderDetailId, plates);
    }

    @Delete(':orderId/orderDetails/:orderDetailId/plates/:plateId')
    @HttpCode(204)
    async deletePlateOrderDetail(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.deletePlateOrderDetail(orderDetailId, plateId);
    }
}
