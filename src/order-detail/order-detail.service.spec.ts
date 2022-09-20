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
        state: faker.random.word(),
        date: faker.date.past(3),
        notes: faker.random.words()
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
});


});

