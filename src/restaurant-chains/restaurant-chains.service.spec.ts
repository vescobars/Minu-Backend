import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantChainsService } from './restaurant-chains.service';

describe('RestaurantChainsService', () => {
  let service: RestaurantChainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantChainsService],
    }).compile();

    service = module.get<RestaurantChainsService>(RestaurantChainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
