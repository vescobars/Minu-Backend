import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { PlateEntity } from '../plate/plate.entity';
import { OrderDetailPlatesService } from './order-detail-plates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderDetailPlatesService', () => {
  let service: OrderDetailPlatesService;
  let orderDetailRepository: Repository<OrderDetailEntity>;
  let plateRepository: Repository<PlateEntity>;
  let orderDetail: OrderDetailEntity;
  let plateList : PlateEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderDetailPlatesService],
    }).compile();

    orderDetailRepository = module.get<Repository<OrderDetailEntity>>(getRepositoryToken(OrderDetailEntity));
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity)); 
    service = module.get<OrderDetailPlatesService>(OrderDetailPlatesService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    plateRepository.clear();
    orderDetailRepository.clear();
 
    plateList = [];
    for(let i = 0; i < 5; i++){
        const plate: PlateEntity = await plateRepository.save({
          name: faker.name.fullName(),
          description: faker.lorem.sentence(),
          value: faker.datatype.number(),
          notes: faker.lorem.sentence()
        })
        plateList.push(plate);
    }
 
    orderDetail = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: []
    })
  }
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
