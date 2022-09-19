import { Test, TestingModule } from '@nestjs/testing';
import { PlatePromotionService } from './plate-promotion.service';

describe('PlatePromotionService', () => {
  let service: PlatePromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatePromotionService],
    }).compile();

    service = module.get<PlatePromotionService>(PlatePromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
