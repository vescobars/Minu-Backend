import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantChainsController } from './restaurant-chains.controller';
import { RestaurantChainsService } from './restaurant-chains.service';

describe('RestaurantChainsController', () => {
  let controller: RestaurantChainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantChainsController],
      providers: [RestaurantChainsService],
    }).compile();

    controller = module.get<RestaurantChainsController>(RestaurantChainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
