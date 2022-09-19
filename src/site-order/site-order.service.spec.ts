import { Test, TestingModule } from '@nestjs/testing';
import { SiteOrderService } from './site-order.service';

describe('SiteOrderService', () => {
  let service: SiteOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteOrderService],
    }).compile();

    service = module.get<SiteOrderService>(SiteOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
