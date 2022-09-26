import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PayModeService } from './pay-mode.service';
import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PayModeDto } from './pay-mode.dto';
import { PayModeEntity } from './pay-mode.entity';

@Controller('paymodes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PayModeController {
    constructor(private readonly payModeService:PayModeService){}

    @Get()
    async findAll() {
      return await this.payModeService.findAll();
    }
  
    @Get(':paymodeId')
    async findOne(@Param('payModeId') payModeId: string) {
      return await this.payModeService.findOne(payModeId);
    }
  
    @Post()
    async create(@Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.create(payMode);
    }
  
    @Put(':paymodeId')
    async update(@Param('payModeId') payModeId: string, @Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.update(payModeId, payMode);
    }
  
    @Delete(':paymodeId')
    @HttpCode(204)
    async delete(@Param('payModeId') payModeId: string) {
      return await this.payModeService.delete(payModeId);
    }

}
