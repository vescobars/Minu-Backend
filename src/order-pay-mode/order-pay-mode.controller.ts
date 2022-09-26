import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PayModeDto } from '../pay-mode/pay-mode.dto';
import { PayModeEntity } from '../pay-mode/pay-mode.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderPayModeService } from './order-pay-mode.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderPayModeController {
    constructor(private readonly orderPayModeService: OrderPayModeService){}

    @Post(':siteId/orders/:orderId/paymodes/:paymodeId')
    async addPayModeOrder(@Param('siteId') siteId:string, @Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.addPayModeOrder(orderId, paymodeId);
    }

    @Get(':siteId/orders/:orderId/paymodes/:paymodeId')
    async findPayModeByOrderIdPayModeId(@Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.findPayModeByOrderIdPayModeId(orderId, paymodeId);
    }

    @Get(':siteId/orders/:orderId/paymodes')
    async findPayModeByOrderId(@Param('orderId') orderId: string){
       return await this.orderPayModeService.findPayModeByOrderId(orderId);
    }

    @Put(':siteId/orders/:orderId/paymodes')
    async associatePayModeOrder(@Body() paymodeDto: PayModeDto, @Param('orderId') orderId: string){
       const paymode = plainToInstance(PayModeEntity, paymodeDto)
       return await this.orderPayModeService.associatePayModeOrder(orderId, paymode);
    }

    @Delete(':siteId/orders/:orderId/paymodes/:paymodeId')
    @HttpCode(204)
    async deletePayModeOrder(@Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.deletePayModeOrder(orderId, paymodeId);
    }
}
