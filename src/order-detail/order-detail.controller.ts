import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderDetailDto } from './order-detail.dto';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Controller('orderDetails')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderDetailController {
    constructor(private readonly orderDetailService:OrderDetailService){}
    
    @Get()
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAll() {
        return await this.orderDetailService.findAll();
    }

    @Get(':orderDetailId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.findOne(orderDetailId);
    }

    @Post()
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.create(orderDetail);
    }

    @Put(':orderDetailId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('orderDetailId') orderDetailId: string, @Body() orderDetailDto: OrderDetailDto) {
        const orderDetail: OrderDetailEntity = plainToInstance(OrderDetailEntity, orderDetailDto);
        return await this.orderDetailService.update(orderDetailId, orderDetail);
    }

    @Delete(':orderDetailId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async delete(@Param('orderDetailId') orderDetailId: string) {
        return await this.orderDetailService.delete(orderDetailId);
    }
}
