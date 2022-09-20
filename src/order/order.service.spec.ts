import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

describe('OrderService', () => {
 let service: OrderService;
 let repository: Repository<OrderEntity>;
 let orderList: OrderEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [OrderService],
   }).compile();

   service = module.get<OrderService>(OrderService);
   repository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity));
   await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  orderList = [];
  for(let i = 0; i < 5; i++){
      const order: OrderEntity = await repository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
      orderList.push(order);
  }
}

 it('should be defined', () => {
  expect(service).toBeDefined();
});

it('findAll should return all order', async () => {
  const order: OrderEntity[] = await service.findAll();
  expect(order).not.toBeNull();
  expect(order).toHaveLength(orderList.length);
});

it('findOne should return a order by id', async () => {
  const storedOrder: OrderEntity = orderList[0];
  const order: OrderEntity = await service.findOne(storedOrder.id);
  expect(order).not.toBeNull();
  expect(order.state).toEqual(storedOrder.state);
  expect(order.date).toEqual(storedOrder.date);
  expect(order.totalValue).toEqual(storedOrder.totalValue);
  expect(order.orderDetail).toEqual(storedOrder.orderDetail);
  expect(order.table).toEqual(storedOrder.table);
  expect(order.restaurantSite).toEqual(storedOrder.restaurantSite);
  expect(order.client).toEqual(storedOrder.client);
  expect(order.payMode).toEqual(storedOrder.payMode);
});


it('findOne should throw an exception for an invalid order', async () => {
  await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The order with the given id was not found")
});

it('create should return a new order', async () => {
  const order: OrderEntity = {
    id: "",
    state: faker.random.word(),
    date: faker.date.past(3),
    totalValue: faker.datatype.number({ max: 100000 }),
    orderDetail: null,
    payMode: null,
    table: null,
    client: null,
    restaurantSite: null
  }

  const newOrder: OrderEntity = await service.create(order);
  expect(newOrder).not.toBeNull();

  const storedOrder: OrderEntity = await repository.findOne({where: {id: newOrder.id}})
  expect(storedOrder).not.toBeNull();
  expect(storedOrder.state).toEqual(newOrder.state)
  expect(storedOrder.date).toEqual(newOrder.date)
  expect(storedOrder.totalValue).toEqual(newOrder.totalValue)
});

it('update should modify a order', async () => {
  const order: OrderEntity = orderList[0];
  order.state = "New state";
  order.totalValue = faker.datatype.number({ max: 100000 });
   const updatedOrder: OrderEntity = await service.update(order.id, order);
  expect(updatedOrder).not.toBeNull();
   const storedOrder: OrderEntity = await repository.findOne({ where: { id: order.id } })
  expect(storedOrder).not.toBeNull();
  expect(storedOrder.state).toEqual(order.state)
  expect(storedOrder.totalValue).toEqual(order.totalValue)
});

it('update should throw an exception for an invalid order', async () => {
  let order: OrderEntity = orderList[0];
  order = {
    ...order, state: "New state", totalValue: faker.datatype.number({ max: 100000 })
  }
  await expect(() => service.update("0", order)).rejects.toHaveProperty("message", "The order with the given id was not found")
});

it('delete should remove a order', async () => {
  const order: OrderEntity = orderList[0];
  await service.delete(order.id);
   const deletedOrder: OrderEntity = await repository.findOne({ where: { id: order.id } })
  expect(deletedOrder).toBeNull();
});

it('delete should throw an exception for an invalid order', async () => {
  const order: OrderEntity = orderList[0];
  await service.delete(order.id);
  await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The order with the given id was not found")
});

});