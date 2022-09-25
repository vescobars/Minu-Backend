import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PayModeService } from './pay-mode.service';
import { Controller, Get,Post,Delete, UseInterceptors, Param, Body, Put, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PayModeDto } from './pay-mode.dto';
import { PayModeEntity } from './pay-mode.entity';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class PayModeController {
    constructor(private readonly payModeService:PayModeService){}

    @Get(':chainId/sites/:siteId/orders/:orderId/paymodes')
    async findAll() {
      return await this.payModeService.findAll();
    }
  
    @Get(':chainId/sites/:siteId/orders/:orderId/paymodes/:paymodeId')
    async findOne(@Param('payModeId') payModeId: string) {
      return await this.payModeService.findOne(payModeId);
    }
  
    @Post(':chainId/sites/:siteId/orders/:orderId/paymodes')
    async create(@Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.create(payMode);
    }
  
    @Put(':chainId/sites/:siteId/orders/:orderId/paymodes/:paymodeId')
    async update(@Param('payModeId') payModeId: string, @Body() payModeDto: PayModeDto) {
      const payMode: PayModeEntity = plainToInstance(PayModeEntity, payModeDto);
      return await this.payModeService.update(payModeId, payMode);
    }
  
    @Delete(':chainId/sites/:siteId/orders/:orderId/paymodes/:paymodeId')
    @HttpCode(204)
    async delete(@Param('payModeId') payModeId: string) {
      return await this.payModeService.delete(payModeId);
    }

}
