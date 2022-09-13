import { Test, TestingModule } from '@nestjs/testing';
import { PayModeService } from './pay-mode.service';

describe('PayModeService', () => {
  let service: PayModeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayModeService],
    }).compile();

    service = module.get<PayModeService>(PayModeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
