import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { PayModeDto } from '../pay-mode/pay-mode.dto';
import { PayModeEntity } from '../pay-mode/pay-mode.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderPayModeService } from './order-pay-mode.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderPayModeController {
    constructor(private readonly orderPayModeService: OrderPayModeService){}

    @Post(':siteId/orders/:orderId/paymodes/:paymodeId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async addPayModeOrder(@Param('siteId') siteId:string, @Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.addPayModeOrder(orderId, paymodeId);
    }

    @Get(':siteId/orders/:orderId/paymodes/:paymodeId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findPayModeByOrderIdPayModeId(@Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.findPayModeByOrderIdPayModeId(orderId, paymodeId);
    }

    @Get(':siteId/orders/:orderId/paymodes')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findPayModeByOrderId(@Param('orderId') orderId: string){
       return await this.orderPayModeService.findPayModeByOrderId(orderId);
    }

    @Put(':siteId/orders/:orderId/paymodes')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async associatePayModeOrder(@Body() paymodeDto: PayModeDto, @Param('orderId') orderId: string){
       const paymode = plainToInstance(PayModeEntity, paymodeDto)
       return await this.orderPayModeService.associatePayModeOrder(orderId, paymode);
    }

    @Delete(':siteId/orders/:orderId/paymodes/:paymodeId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async deletePayModeOrder(@Param('orderId') orderId: string, @Param('paymodeId') paymodeId: string){
       return await this.orderPayModeService.deletePayModeOrder(orderId, paymodeId);
    }
}
