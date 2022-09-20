import { Test, TestingModule } from '@nestjs/testing';
import { OrderEntity } from '../order/order.entity';
import { TableEntity } from '../table/table.entity';
import { Repository } from 'typeorm';
import { OrderTableService } from './order-table.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderTableService', () => {
  let service: OrderTableService;
  let orderRepository: Repository<OrderEntity>;
  let tableRepository: Repository<TableEntity>;
  let order: OrderEntity;
  let table : TableEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderTableService],
    }).compile();

    tableRepository = module.get<Repository<TableEntity>>(getRepositoryToken(TableEntity));
    orderRepository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity)); 
    service = module.get<OrderTableService>(OrderTableService);
    await seedDatabase();
  });


  const seedDatabase = async () => {
    orderRepository.clear();
    tableRepository.clear();
 
    table = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    })

    order = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:table,
      payMode:null,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
