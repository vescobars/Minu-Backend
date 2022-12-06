import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from '../order/order.dto';
import { OrderEntity } from '../order/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteOrderService } from './site-order.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteOrderController {
    constructor(private readonly siteOrderService: SiteOrderService) {}
    
  // @HasRoles(Role.Reader)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/orders/:orderId')
  async findOrderBySiteIdOrderId(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.siteOrderService.findOrderBySiteIdOrderId(
      siteId,
      orderId,
    );
  }
  // @HasRoles(Role.Reader)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/orders')
  async findOrdersBySiteId(@Param('siteId') siteId: string) {
    return await this.siteOrderService.findOrdersBySiteId(siteId);
  }
  // @HasRoles(Role.Writer)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/orders/:orderId')
  async addordersite(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.siteOrderService.addOrderSite(siteId, orderId);
  }
  // @HasRoles(Role.Writer)
  // @UseGuards(JwtAuthGuard, RolesGuard) 
  @Put(':siteId/orders')
  async associateOrdersSite(
    @Body() ordersDto: OrderDto[],
    @Param('siteId') siteId: string,
  ) {
    const orders = plainToInstance(OrderEntity, ordersDto);
    return await this.siteOrderService.associateOrdersSite(
      siteId,
      orders,
    );
  }
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/orders/:orderId')
  @HttpCode(204)
  async deleteOrderSite(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.siteOrderService.deleteOrderSite(siteId, orderId);
  }
}
