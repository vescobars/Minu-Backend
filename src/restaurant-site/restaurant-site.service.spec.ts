import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSiteService } from './restaurant-site.service';

describe('RestaurantSiteService', () => {
  let service: RestaurantSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantSiteService],
    }).compile();

    service = module.get<RestaurantSiteService>(RestaurantSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
