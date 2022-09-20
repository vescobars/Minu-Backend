import { Test, TestingModule } from '@nestjs/testing';
import { OrderOrderDetailService } from './order-order-detail.service';

describe('OrderOrderDetailService', () => {
  let service: OrderOrderDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderOrderDetailService],
    }).compile();

    service = module.get<OrderOrderDetailService>(OrderOrderDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
