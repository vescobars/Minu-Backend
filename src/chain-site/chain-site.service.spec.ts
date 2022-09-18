import { Test, TestingModule } from '@nestjs/testing';
import { ChainSiteService } from './chain-site.service';

describe('ChainSiteService', () => {
  let service: ChainSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainSiteService],
    }).compile();

    service = module.get<ChainSiteService>(ChainSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
