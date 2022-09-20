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
});
