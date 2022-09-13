import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PayModeService } from './pay-mode.service';
import { PayModeEntity} from './pay-mode.entity';

describe('PayModeService', () => {
  let service: PayModeService;
  let repository: Repository<PayModeEntity>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PayModeService],
    }).compile();

    service = module.get<PayModeService>(PayModeService);
    repository = module.get<Repository<PayModeEntity>>(getRepositoryToken(PayModeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
