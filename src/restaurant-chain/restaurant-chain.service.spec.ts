import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantChainService } from './restaurant-chain.service';

describe('RestaurantChainService', () => {
  let service: RestaurantChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantChainService],
    }).compile();

    service = module.get<RestaurantChainService>(RestaurantChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
