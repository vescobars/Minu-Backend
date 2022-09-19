import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteReviewService } from './site-review.service';

describe('SiteReviewService', () => {
  let service: SiteReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteReviewService],
    }).compile();

    service = module.get<SiteReviewService>(SiteReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
