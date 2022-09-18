import { Test, TestingModule } from '@nestjs/testing';
import { SiteReviewService } from './site-review.service';

describe('SiteReviewService', () => {
  let service: SiteReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteReviewService],
    }).compile();

    service = module.get<SiteReviewService>(SiteReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
