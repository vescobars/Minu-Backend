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

});