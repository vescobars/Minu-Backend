import { Test, TestingModule } from '@nestjs/testing';
import { OrderEntity } from '../order/order.entity';
import { PayModeEntity } from '../pay-mode/pay-mode.entity';
import { Repository } from 'typeorm';
import { OrderPayModeService } from './order-pay-mode.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderPayModeService', () => {
  let service: OrderPayModeService;
  let orderRepository: Repository<OrderEntity>;
  let payModeRepository: Repository<PayModeEntity>;
  let order: OrderEntity;
  let payMode : PayModeEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderPayModeService],
    }).compile();

    payModeRepository = module.get<Repository<PayModeEntity>>(getRepositoryToken(PayModeEntity));
    orderRepository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity)); 
    service = module.get<OrderPayModeService>(OrderPayModeService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    orderRepository.clear();
    payModeRepository.clear();
 
    payMode = await payModeRepository.save({
      type: faker.random.word()
    })

    order = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode: payMode,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPayModeOrder should add an payMode to a order', async () => {
    const newPayMode: PayModeEntity = await payModeRepository.save({
      type: faker.random.word()
    });
 
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    const result: OrderEntity = await service.addPayModeOrder(newOrder.id, newPayMode.id);
   
    expect(result.payMode).not.toBeNull();
    expect(result.payMode.type).toEqual(newPayMode.type);
  });

  it('addPayModeOrder should thrown exception for an invalid payMode', async () => {
    const newPayMode: PayModeEntity = await payModeRepository.save({
      type: faker.random.word()
    });
 
    await expect(() => service.addPayModeOrder(newPayMode.id, "0")).rejects.toHaveProperty("message", "The payMode with the given id was not found");
  });

  it('addPayModeOrder should throw an exception for an invalid order', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    await expect(() => service.addPayModeOrder("0", newOrder.id)).rejects.toHaveProperty("message", "The payMode with the given id was not found");
  });

  it('findPayModeByOrderIdPayModeId should return payMode by order', async () => {
    const payModex: PayModeEntity = payMode;
    const storedOrderDetail: PayModeEntity = await service.findPayModeByOrderIdPayModeId(order.id, payModex.id, )
    expect(storedOrderDetail).not.toBeNull();
    expect(storedOrderDetail.type).toEqual(payModex.type);
  });

  it('findPayModeByOrderIdPayModeId should throw an exception for an invalid payMode', async () => {
    await expect(()=> service.findPayModeByOrderIdPayModeId(order.id, "0")).rejects.toHaveProperty("message", "The payMode with the given id was not found");
  });

  it('findPayModeByOrderIdPayModeId should throw an exception for an invalid order', async () => {
    const payModex: PayModeEntity = payMode;
    await expect(()=> service.findPayModeByOrderIdPayModeId("0", payModex.id)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('findPayModeByOrderId should return payMode by order', async ()=>{
    const payModex: PayModeEntity = await service.findPayModeByOrderId(order.id);
    expect(payModex.type).toEqual(payMode.type);
  });

  it('findPayModeByOrderId should throw an exception for an invalid order', async () => {
    await expect(()=> service.findPayModeByOrderId("0")).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associatePayModeOrder should update payMode for a order', async () => {
    const newPayMode: PayModeEntity = await payModeRepository.save({
      type: faker.random.word()
    });
 
    const updatedOrder: OrderEntity = await service.associatePayModeOrder(order.id, newPayMode);
    
    expect(updatedOrder.payMode.id).toEqual(newPayMode.id);
    expect(updatedOrder.payMode.type).toEqual(newPayMode.type);
  });

  it('associatePayModeOrder should throw an exception for an invalid order', async () => {
    const newPayMode: PayModeEntity = await payModeRepository.save({
      type: faker.random.word()
    });
 
    await expect(()=> service.associatePayModeOrder("0", newPayMode)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associatePayModeOrder should throw an exception for an invalid payMode', async () => {
    const newPayMode: PayModeEntity = payMode;
    newPayMode.id = "0";
 
    await expect(()=> service.associatePayModeOrder(order.id, newPayMode)).rejects.toHaveProperty("message", "The payMode with the given id was not found");
  });

  it('deletePayModeOrder should remove an payMode from a order', async () => {
    const payModex: PayModeEntity = payMode;
   
    await service.deletePayModeOrder(order.id, payModex.id);
 
    const storedOrder: OrderEntity = await orderRepository.findOne({where: {id: order.id}, relations:  ["orderDetail","payMode","table"]});
    const deletedPayMode: PayModeEntity = storedOrder.payMode;
 
    expect(deletedPayMode).toBeNull();

  });
});
