import { Test, TestingModule } from '@nestjs/testing';
import { OrderPayModeService } from './order-pay-mode.service';

describe('OrderPayModeService', () => {
  let service: OrderPayModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPayModeService],
    }).compile();

    service = module.get<OrderPayModeService>(OrderPayModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
