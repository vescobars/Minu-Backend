import { Test, TestingModule } from '@nestjs/testing';
import { SitePromotionService } from './site-promotion.service';

describe('SitePromotionService', () => {
  let service: SitePromotionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SitePromotionService],
    }).compile();

    service = module.get<SitePromotionService>(SitePromotionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
