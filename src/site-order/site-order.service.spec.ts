import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteOrderService } from './site-order.service';

describe('SiteOrderService', () => {
  let service: SiteOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteOrderService],
    }).compile();

    service = module.get<SiteOrderService>(SiteOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
