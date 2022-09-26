import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from 'src/order/order.dto';
import { OrderEntity } from 'src/order/order.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClientOrderService } from './client-order.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientOrderController {
  constructor(private readonly clientOrderService: ClientOrderService) {}

  @Get(':clientId/orders/:orderId')
  async findOrderByClientIdOrderId(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.clientOrderService.findOrderByClientIdOrderId(
      clientId,
      orderId,
    );
  }

  @Get(':clientId/orders')
  async findOrdersByClientId(@Param('clientId') clientId: string) {
    return await this.clientOrderService.findOrdersByClientId(clientId);
  }

  @Post(':clientId/orders/:orderId')
  async addOrderClient(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.clientOrderService.addOrderClient(clientId, orderId);
  }

  @Put(':clientId/orders')
  async associateOrdersClient(
    @Body() ordersDto: OrderDto[],
    @Param('clientId') clientId: string,
  ) {
    const orders = plainToInstance(OrderEntity, ordersDto);
    return await this.clientOrderService.associateOrdersClient(
      clientId,
      orders,
    );
  }

  @Delete(':clientId/orders/:orderId')
  @HttpCode(204)
  async deleteOrderClient(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.clientOrderService.deleteOrderClient(clientId, orderId);
  }
}
