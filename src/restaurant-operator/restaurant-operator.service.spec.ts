import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantOperatorService } from './restaurant-operator.service';

describe('RestaurantOperatorService', () => {
  let service: RestaurantOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantOperatorService],
    }).compile();

    service = module.get<RestaurantOperatorService>(RestaurantOperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
