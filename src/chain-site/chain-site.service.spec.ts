import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ChainSiteService } from './chain-site.service';

describe('ChainSiteService', () => {
  let service: ChainSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ChainSiteService],
    }).compile();

    service = module.get<ChainSiteService>(ChainSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
