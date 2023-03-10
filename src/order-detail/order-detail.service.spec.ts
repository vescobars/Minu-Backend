import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

describe('OrderDetailService', () => {
 let service: OrderDetailService;
 let repository: Repository<OrderDetailEntity>;
 let orderDetailList: OrderDetailEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [OrderDetailService],
   }).compile();

   service = module.get<OrderDetailService>(OrderDetailService);
   repository = module.get<Repository<OrderDetailEntity>>(getRepositoryToken(OrderDetailEntity));
   await seedDatabase();
  });
  
  const seedDatabase = async () => {
    repository.clear();
    orderDetailList = [];
    for(let i = 0; i < 5; i++){
        const orderDetail: OrderDetailEntity = await repository.save({
        notes: faker.random.words(),
        order: null,
        plates: []
      })
        orderDetailList.push(orderDetail);
    }
  }
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
it('findAll should return all orderDetail', async () => {
  const orderDetail: OrderDetailEntity[] = await service.findAll();
  expect(orderDetail).not.toBeNull();
  expect(orderDetail).toHaveLength(orderDetailList.length);
});

it('findOne should return a orderDetail by id', async () => {
  const storedOrderDetail: OrderDetailEntity = orderDetailList[0];
  const orderDetail: OrderDetailEntity = await service.findOne(storedOrderDetail.id);
  expect(orderDetail).not.toBeNull();
  expect(orderDetail.notes).toEqual(storedOrderDetail.notes);
});

it('findOne should throw an exception for an invalid orderDetail', async () => {
  await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The orderDetail with the given id was not found")
});

it('update should modify a orderDetail', async () => {
  const orderDetail: OrderDetailEntity = orderDetailList[0];
  orderDetail.notes = "New notes";
  const updatedOrderDetail: OrderDetailEntity = await service.update(orderDetail.id, orderDetail);
  expect(updatedOrderDetail).not.toBeNull();
  const storedOrderDetail: OrderDetailEntity = await repository.findOne({ where: { id: orderDetail.id } })
  expect(storedOrderDetail).not.toBeNull();
  expect(storedOrderDetail.notes).toEqual(orderDetail.notes)
});

it('update should throw an exception for an invalid orderDetail', async () => {
  let orderDetail: OrderDetailEntity = orderDetailList[0];
  orderDetail = {
    ...orderDetail, notes: "New notes"
  }
  await expect(() => service.update("0", orderDetail)).rejects.toHaveProperty("message", "The orderDetail with the given id was not found")
});

it('delete should remove a orderDetail', async () => {
  const orderDetail: OrderDetailEntity = orderDetailList[0];
  await service.delete(orderDetail.id);
  const deletedOrderDetail: OrderDetailEntity = await repository.findOne({ where: { id: orderDetail.id } })
  expect(deletedOrderDetail).toBeNull();
});


it('delete should throw an exception for an invalid orderDetail', async () => {
  const orderDetail: OrderDetailEntity = orderDetailList[0];
  await service.delete(orderDetail.id);
  await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The orderDetail with the given id was not found")
});

it('create should return a new orderDetail', async () => {
  const orderDetail: OrderDetailEntity = {
    id: "",
    notes: faker.random.words(),
    order: null,
    plates: null
  }

  const newOrderDetail: OrderDetailEntity = await service.create(orderDetail);
  expect(newOrderDetail).not.toBeNull();

  const storedOrderDetail: OrderDetailEntity = await repository.findOne({where: {id: newOrderDetail.id}})
  expect(storedOrderDetail).not.toBeNull();
  expect(storedOrderDetail.notes).toEqual(newOrderDetail.notes);
});

});

