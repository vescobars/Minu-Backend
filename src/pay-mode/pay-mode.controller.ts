import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PayModeService } from './pay-mode.service';
import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put, HttpCode, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PayModeDto } from './pay-mode.dto';
import { PayModeEntity } from './pay-mode.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';

@Controller('paymodes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PayModeController {
    constructor(private readonly payModeService:PayModeService){}

    @Get()
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAll() {
      return await this.payModeService.findAll();
    }
  
    @Get(':paymodeId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Param('payModeId') payModeId: string) {
      return await this.payModeService.findOne(payModeId);
    }
  
    @Post()
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.create(payMode);
    }
  
    @Put(':paymodeId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('payModeId') payModeId: string, @Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.update(payModeId, payMode);
    }
  
    @Delete(':paymodeId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async delete(@Param('payModeId') payModeId: string) {
      return await this.payModeService.delete(payModeId);
    }

}
