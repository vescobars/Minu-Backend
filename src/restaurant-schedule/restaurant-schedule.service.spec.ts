import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantScheduleService } from './restaurant-schedule.service';

describe('RestaurantScheduleService', () => {
  let service: RestaurantScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantScheduleService],
    }).compile();

    service = module.get<RestaurantScheduleService>(RestaurantScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
