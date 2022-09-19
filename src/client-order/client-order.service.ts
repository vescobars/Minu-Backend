import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { OrderEntity } from '../order/order.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ClientOrderService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async addOrderClient(
    clientId: string,
    orderId: string,
  ): Promise<ClientEntity> {
    const order: OrderEntity = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order)
      throw new BusinessLogicException(
        'The order with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['orders', 'exhibitions'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.orders = [...client.orders, order];
    return await this.clientRepository.save(client);
  }

  async findOrderByClientIdOrderId(
    clientId: string,
    orderId: string,
  ): Promise<OrderEntity> {
    const order: OrderEntity = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order)
      throw new BusinessLogicException(
        'The order with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['orders'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clientOrder: OrderEntity = client.orders.find(
      (e) => e.id === order.id,
    );

    if (!clientOrder)
      throw new BusinessLogicException(
        'The order with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    return clientOrder;
  }

  async findOrdersByClientId(clientId: string): Promise<OrderEntity[]> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['orders'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return client.orders;
  }

  async associateOrdersClient(
    clientId: string,
    orders: OrderEntity[],
  ): Promise<ClientEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['orders'],
    });

    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < orders.length; i++) {
      const order: OrderEntity = await this.orderRepository.findOne({
        where: { id: orders[i].id },
      });
      if (!order)
        throw new BusinessLogicException(
          'The order with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    client.orders = orders;
    return await this.clientRepository.save(client);
  }

  async deleteOrderClient(clientId: string, orderId: string) {
    const order: OrderEntity = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    if (!order)
      throw new BusinessLogicException(
        'The order with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['orders'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clientOrder: OrderEntity = client.orders.find(
      (e) => e.id === order.id,
    );

    if (!clientOrder)
      throw new BusinessLogicException(
        'The order with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    client.orders = client.orders.filter((e) => e.id !== orderId);
    await this.clientRepository.save(client);
  }
}
