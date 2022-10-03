import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { OrderEntity } from './order.entity';
import { plainToInstance } from 'class-transformer';
import { HttpCode, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/shared/security/roles.decorators';

@Controller('orders')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderController {
    constructor(private readonly orderService:OrderService){}
    
    @Get()
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAll() {
      return await this.orderService.findAll();
    }

    @Get(':orderId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Param('orderId') orderId:string){
        return await this.orderService.findOne(orderId);
    }

    @Post()
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        order.date = new Date(order.date);
        return await this.orderService.create(order);
    }

    @Put(':orderId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('orderId') orderId:string,@Body() orderDto:OrderDto){
        const order:OrderEntity = plainToInstance(OrderEntity,orderDto);
        return await this.orderService.update(orderId,order);
    }

    @Delete(':orderId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async delete(@Param('orderId') orderId:string){
        return await this.orderService.delete(orderId);
    }

}
