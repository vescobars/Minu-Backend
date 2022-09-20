import { Test, TestingModule } from '@nestjs/testing';
import { OrderDetailPlatesService } from './order-detail-plates.service';

describe('OrderDetailPlatesService', () => {
  let service: OrderDetailPlatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDetailPlatesService],
    }).compile();

    service = module.get<OrderDetailPlatesService>(OrderDetailPlatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
