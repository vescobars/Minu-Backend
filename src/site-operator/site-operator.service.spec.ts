import { Test, TestingModule } from '@nestjs/testing';
import { SiteOperatorService } from './site-operator.service';

describe('SiteOperatorService', () => {
  let service: SiteOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteOperatorService],
    }).compile();

    service = module.get<SiteOperatorService>(SiteOperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
