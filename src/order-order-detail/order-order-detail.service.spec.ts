import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { OrderEntity } from '../order/order.entity';
import { OrderOrderDetailService } from './order-order-detail.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderOrderDetailService', () => {
  let service: OrderOrderDetailService;
  let orderRepository: Repository<OrderEntity>;
  let orderDetailRepository: Repository<OrderDetailEntity>;
  let order: OrderEntity;
  let orderDetail : OrderDetailEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderOrderDetailService],
    }).compile();

    orderDetailRepository = module.get<Repository<OrderDetailEntity>>(getRepositoryToken(OrderDetailEntity));
    orderRepository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity)); 
    service = module.get<OrderOrderDetailService>(OrderOrderDetailService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    orderRepository.clear();
    orderDetailRepository.clear();
 
    orderDetail = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: null
    })

    order = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: orderDetail,
      table:null,
      payMode:null,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addOrderDetailOrder should add an orderDetail to a order', async () => {
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: null
    });
 
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    const result: OrderEntity = await service.addOrderDetailOrder(newOrder.id, newOrderDetail.id);
   
    expect(result.orderDetail).not.toBeNull();
    expect(result.orderDetail.notes).toEqual(newOrderDetail.notes);
  });

  it('addOrderDetailOrder should thrown exception for an invalid orderDetail', async () => {
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: null
    });
 
    await expect(() => service.addOrderDetailOrder(newOrderDetail.id, "0")).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('addOrderDetailOrder should throw an exception for an invalid order', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    await expect(() => service.addOrderDetailOrder("0", newOrder.id)).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('findOrderDetailByOrderIdOrderDetailId should return orderDetail by order', async () => {
    const orderDetailc: OrderDetailEntity = orderDetail;
    const storedOrderDetail: OrderDetailEntity = await service.findOrderDetailByOrderIdOrderDetailId(order.id, orderDetailc.id, )
    expect(storedOrderDetail).not.toBeNull();
    expect(storedOrderDetail.notes).toEqual(orderDetailc.notes);
  });

  it('findOrderDetailByOrderIdOrderDetailId should throw an exception for an invalid orderDetail', async () => {
    await expect(()=> service.findOrderDetailByOrderIdOrderDetailId(order.id, "0")).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('findOrderDetailByOrderIdOrderDetailId should throw an exception for an invalid order', async () => {
    const orderDetailx: OrderDetailEntity = orderDetail;
    await expect(()=> service.findOrderDetailByOrderIdOrderDetailId("0", orderDetailx.id)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });


  it('findOrderDetailByOrderId should return orderDetail by order', async ()=>{
    const orderDetailx: OrderDetailEntity = await service.findOrderDetailByOrderId(order.id);
    expect(orderDetailx.notes).toEqual(orderDetail.notes);
  });

  it('findOrderDetailByOrderId should throw an exception for an invalid order', async () => {
    await expect(()=> service.findOrderDetailByOrderId("0")).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associateOrderDetailOrder should update orderDetails list for a order', async () => {
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: null
    });
 
    const updatedOrder: OrderEntity = await service.associateOrderDetailOrder(order.id, newOrderDetail);
    
    expect(updatedOrder.orderDetail.id).toEqual(newOrderDetail.id);
    expect(updatedOrder.orderDetail.notes).toEqual(newOrderDetail.notes);
  });

  it('associateOrderDetailOrder should throw an exception for an invalid order', async () => {
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: null
    });
 
    await expect(()=> service.associateOrderDetailOrder("0", newOrderDetail)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associateOrderDetailOrder should throw an exception for an invalid orderDetail', async () => {
    const newOrderDetail: OrderDetailEntity = orderDetail;
    newOrderDetail.id = "0";
 
    await expect(()=> service.associateOrderDetailOrder(order.id, newOrderDetail)).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('deleteOrderDetailOrder should remove an orderDetail from a order', async () => {
    const orderDetailx: OrderDetailEntity = orderDetail;
   
    await service.deleteOrderDetailOrder(order.id, orderDetailx.id);
 
    const storedOrder: OrderEntity = await orderRepository.findOne({where: {id: order.id}, relations:  ["orderDetail","payMode","table"]});
    const deletedOrderDetail: OrderDetailEntity = storedOrder.orderDetail;
 
    expect(deletedOrderDetail).toBeNull();
 
  });

});
