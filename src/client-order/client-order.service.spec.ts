import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClientOrderService } from './client-order.service';

describe('ClientOrderService', () => {
  let service: ClientOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientOrderService],
    }).compile();

    service = module.get<ClientOrderService>(ClientOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
