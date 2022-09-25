import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from '../order/order.dto';
import { OrderEntity } from '../order/order.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteOrderService } from './site-order.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteOrderController {
    constructor(private readonly SiteOrderService: SiteOrderService) {}

  @Get(':siteId/orders/:orderId')
  async findOrderBySiteIdOrderId(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.SiteOrderService.findOrderBySiteIdOrderId(
      siteId,
      orderId,
    );
  }

  @Get(':siteId/orders')
  async findOrdersBySiteId(@Param('siteId') siteId: string) {
    return await this.SiteOrderService.findOrdersBySiteId(siteId);
  }

  @Post(':siteId/orders/:orderId')
  async addordersite(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.SiteOrderService.addOrderSite(siteId, orderId);
  }
  
 @Put(':siteId/orders')
  async associateOrdersSite(
    @Body() ordersDto: OrderDto[],
    @Param('siteId') siteId: string,
  ) {
    const orders = plainToInstance(OrderEntity, ordersDto);
    return await this.SiteOrderService.associateOrdersSite(
      siteId,
      orders,
    );
  }

  @Delete(':siteId/orders/:orderId')
  @HttpCode(204)
  async deleteOrderSite(
    @Param('siteId') siteId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.SiteOrderService.deleteOrderSite(siteId, orderId);
  }
}
