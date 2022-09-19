import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';

describe('RestaurantChainService', () => {
  let service: RestaurantChainService;
  let repository: Repository<RestaurantChainEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantChainService],
    }).compile();
 
    service = module.get<RestaurantChainService>(RestaurantChainService);
    repository = module.get<Repository<RestaurantChainEntity>>(
      getRepositoryToken(RestaurantChainEntity),
      );
  });
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 });
