import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteOperatorService } from './site-operator.service';

describe('SiteOperatorService', () => {
  let service: SiteOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteOperatorService],
    }).compile();

    service = module.get<SiteOperatorService>(SiteOperatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
