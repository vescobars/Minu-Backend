import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PlateDto } from '../plate/plate.dto';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderDetailPlatesService } from './order-detail-plates.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderDetailPlatesController {
    constructor(private readonly orderDetailPlatesService: OrderDetailPlatesService){}

    @Post(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId/plates/:plateId')
    async addPlateOrderDetail(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.addPlateOrderDetail(orderDetailId, plateId);
    }

    @Get(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId/plates/:plateId')
    async findPlateByOrderDetailIdPlateId(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.findPlateByOrderDetailIdPlateId(orderDetailId, plateId);
    }

    @Get(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId/plates')
    async findPlatesByOrderDetailId(@Param('orderDetailId') orderDetailId: string){
       return await this.orderDetailPlatesService.findPlatesByOrderDetailId(orderDetailId);
    }

    @Put(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId/plates')
    async associatePlatesOrderDetail(@Body() platesDto: PlateDto[], @Param('orderDetailId') orderDetailId: string){
       const plates = plainToInstance(PlateEntity, platesDto)
       return await this.orderDetailPlatesService.associatePlatesOrderDetail(orderDetailId, plates);
    }

    @Delete(':chainId/sites/:siteId/orders/:orderId/orderDetails/:orderDetailId/plates/:plateId')
    @HttpCode(204)
    async deletePlateOrderDetail(@Param('orderDetailId') orderDetailId: string, @Param('plateId') plateId: string){
       return await this.orderDetailPlatesService.deletePlateOrderDetail(orderDetailId, plateId);
    }
}
