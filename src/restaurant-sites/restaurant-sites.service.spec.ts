import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSitesService } from './restaurant-sites.service';

describe('RestaurantSitesService', () => {
  let service: RestaurantSitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantSitesService],
    }).compile();

    service = module.get<RestaurantSitesService>(RestaurantSitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
