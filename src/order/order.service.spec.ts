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
   //await seedDatabase();
 });

 it('should be defined', () => {
  expect(service).toBeDefined();
});

});