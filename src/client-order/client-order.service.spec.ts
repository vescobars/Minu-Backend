import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClientOrderService } from './client-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../client/client.entity';
import { OrderEntity } from '../order/order.entity';

describe('ClientOrderService', () => {
  let service: ClientOrderService;
  let clientRepository: Repository<ClientEntity>;
  let orderRepository: Repository<OrderEntity>;
  let client: ClientEntity;
  let ordersList: OrderEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientOrderService],
    }).compile();

    service = module.get<ClientOrderService>(ClientOrderService);
    clientRepository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    orderRepository.clear();
    clientRepository.clear();

    ordersList = [];
    for (let i = 0; i < 5; i++) {
      const order: OrderEntity = await orderRepository.save({
        state: faker.random.word(),
        date: faker.date.recent(),
        totalValue: 14000,
        orderDetail: null,
        table: null,
        payMode: null,
      });
      ordersList.push(order);
    }

    client = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      orders: ordersList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addOrderClient should add an order to a client', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    const newClient: ClientEntity = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      orders: [],
      reviews: [],
    });

    const result: ClientEntity = await service.addOrderClient(
      newClient.id,
      newOrder.id,
    );

    expect(result.orders.length).toBe(1);
    expect(result.orders[0].state).toEqual(newOrder.state);
    expect(result.orders[0].date).toEqual(newOrder.date);
    expect(result.orders[0].totalValue).toEqual(newOrder.totalValue);
    expect(result.orders[0].client).toBe(newOrder.client);
  });

  it('addOrderClient should thrown exception for an invalid order', async () => {
    const newClient: ClientEntity = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      orders: [],
      reviews: [],
    });

    await expect(() =>
      service.addOrderClient(newClient.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id was not found',
    );
  });

  it('addOrderClient should throw an exception for an invalid client', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    await expect(() =>
      service.addOrderClient('0', newOrder.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('findOrderByClientIdOrderId should return order by client', async () => {
    const order: OrderEntity = ordersList[0];
    const storedOrder: OrderEntity = await service.findOrderByClientIdOrderId(
      client.id,
      order.id,
    );
    expect(storedOrder).not.toBeNull();
    expect(order.state).toBe(storedOrder.state);
    expect(order.date).toEqual(storedOrder.date);
    expect(order.totalValue).toBe(storedOrder.totalValue);
    expect(order.client).toBe(storedOrder.client);
  });

  it('findOrderByClientIdOrderId should throw an exception for an invalid order', async () => {
    await expect(() =>
      service.findOrderByClientIdOrderId(client.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id was not found',
    );
  });

  it('findOrderByClientIdOrderId should throw an exception for an invalid client', async () => {
    const order: OrderEntity = ordersList[0];
    await expect(() =>
      service.findOrderByClientIdOrderId('0', order.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('findOrderByClientIdOrderId should throw an exception for an order not associated to the client', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    await expect(() =>
      service.findOrderByClientIdOrderId(client.id, newOrder.id),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id is not associated to the client',
    );
  });

  it('findOrdersByClientId should return orders by client', async () => {
    const orders: OrderEntity[] = await service.findOrdersByClientId(client.id);
    expect(orders.length).toBe(5);
  });

  it('findOrdersByClientId should throw an exception for an invalid client', async () => {
    await expect(() =>
      service.findOrdersByClientId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('associateOrdersClient should update orders list for a client', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    const updatedClient: ClientEntity = await service.associateOrdersClient(
      client.id,
      [newOrder],
    );
    expect(updatedClient.orders.length).toBe(1);

    expect(updatedClient.orders[0].state).toBe(newOrder.state);
    expect(updatedClient.orders[0].date).toBe(newOrder.date);
    expect(updatedClient.orders[0].totalValue).toBe(newOrder.totalValue);
    expect(updatedClient.orders[0].client).toBe(newOrder.client);
  });

  it('associateOrdersClient should throw an exception for an invalid client', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    await expect(() =>
      service.associateOrdersClient('0', [newOrder]),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('associateOrdersClient should throw an exception for an invalid order', async () => {
    const newOrder: OrderEntity = ordersList[0];
    newOrder.id = '0';

    await expect(() =>
      service.associateOrdersClient(client.id, [newOrder]),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id was not found',
    );
  });

  it('deleteOrderToClient should remove an order from a client', async () => {
    const order: OrderEntity = ordersList[0];

    await service.deleteOrderClient(client.id, order.id);

    const storedClient: ClientEntity = await clientRepository.findOne({
      where: { id: client.id },
      relations: ['orders'],
    });
    const deletedOrder: OrderEntity = storedClient.orders.find(
      (a) => a.id === order.id,
    );

    expect(deletedOrder).toBeUndefined();
  });

  it('deleteOrderToClient should thrown an exception for an invalid order', async () => {
    await expect(() =>
      service.deleteOrderClient(client.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id was not found',
    );
  });

  it('deleteOrderToClient should thrown an exception for an invalid client', async () => {
    const order: OrderEntity = ordersList[0];
    await expect(() =>
      service.deleteOrderClient('0', order.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('deleteOrderToClient should thrown an exception for an non asocciated order', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table: null,
      payMode: null,
    });

    await expect(() =>
      service.deleteOrderClient(client.id, newOrder.id),
    ).rejects.toHaveProperty(
      'message',
      'The order with the given id is not associated to the client',
    );
  });
});
