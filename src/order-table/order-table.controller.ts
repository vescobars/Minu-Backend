import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TableDto } from '../table/table.dto';
import { TableEntity } from '../table/table.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderTableService } from './order-table.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderTableController {
    constructor(private readonly orderTableService: OrderTableService){}

   @Post(':siteId/orders/:orderId/tables/:tableId')
   async addTableOrder(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.addTableOrder(orderId, tableId);
   }

   @Get(':siteId/orders/:orderId/tables/:tableId')
   async findTableByOrderIdTableId(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.findTableByOrderIdTableId(orderId, tableId);
   }

   @Get(':siteId/orders/:orderId/tables')
   async findTableByOrderId(@Param('orderId') orderId: string){
      return await this.orderTableService.findTableByOrderId(orderId);
   }

   @Put(':siteId/orders/:orderId/tables')
   async associateTableOrder(@Body() tableDto: TableDto, @Param('orderId') orderId: string){
      const table = plainToInstance(TableEntity, tableDto)
      return await this.orderTableService.associateTableOrder(orderId, table);
   }

   @Delete(':siteId/orders/:orderId/tables/:tableId')
   @HttpCode(204)
   async deleteTableOrder(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.deleteTableOrder(orderId, tableId);
   }
}