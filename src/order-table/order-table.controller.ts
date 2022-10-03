import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TableDto } from '../table/table.dto';
import { TableEntity } from '../table/table.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { OrderTableService } from './order-table.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/shared/security/roles.decorators';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class OrderTableController {
    constructor(private readonly orderTableService: OrderTableService){}

   @Post(':siteId/orders/:orderId/tables/:tableId')
   @HasRoles(Role.Writer)
   @UseGuards(JwtAuthGuard, RolesGuard)
   async addTableOrder(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.addTableOrder(orderId, tableId);
   }

   @Get(':siteId/orders/:orderId/tables/:tableId')
   @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
   async findTableByOrderIdTableId(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.findTableByOrderIdTableId(orderId, tableId);
   }

   @Get(':siteId/orders/:orderId/tables')
   @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
   async findTableByOrderId(@Param('orderId') orderId: string){
      return await this.orderTableService.findTableByOrderId(orderId);
   }

   @Put(':siteId/orders/:orderId/tables')
   @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
   async associateTableOrder(@Body() tableDto: TableDto, @Param('orderId') orderId: string){
      const table = plainToInstance(TableEntity, tableDto)
      return await this.orderTableService.associateTableOrder(orderId, table);
   }

   @Delete(':siteId/orders/:orderId/tables/:tableId')
   @HasRoles(Role.Deleter)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @HttpCode(204)
   async deleteTableOrder(@Param('orderId') orderId: string, @Param('tableId') tableId: string){
      return await this.orderTableService.deleteTableOrder(orderId, tableId);
   }
}
