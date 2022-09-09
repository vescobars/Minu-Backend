import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSitesController } from './restaurant-sites.controller';
import { RestaurantSitesService } from './restaurant-sites.service';

describe('RestaurantSitesController', () => {
  let controller: RestaurantSitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantSitesController],
      providers: [RestaurantSitesService],
    }).compile();

    controller = module.get<RestaurantSitesController>(RestaurantSitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
