import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { OrderDto } from 'src/order/order.dto';
import { OrderEntity } from 'src/order/order.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { HasRoles } from '../shared/security/roles.decorators';
import { ClientOrderService } from './client-order.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientOrderController {
  constructor(private readonly clientOrderService: ClientOrderService) {}

  @Get(':clientId/orders/:orderId')
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOrdersByClientId(@Param('clientId') clientId: string) {
    return await this.clientOrderService.findOrdersByClientId(clientId);
  }

  @Post(':clientId/orders/:orderId')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addOrderClient(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.clientOrderService.addOrderClient(clientId, orderId);
  }

  @Put(':clientId/orders')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOrderClient(
    @Param('clientId') clientId: string,
    @Param('orderId') orderId: string,
  ) {
    return await this.clientOrderService.deleteOrderClient(clientId, orderId);
  }
}
