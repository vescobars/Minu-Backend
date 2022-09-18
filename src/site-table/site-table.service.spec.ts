import { Test, TestingModule } from '@nestjs/testing';
import { SiteTableService } from './site-table.service';

describe('SiteTableService', () => {
  let service: SiteTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteTableService],
    }).compile();

    service = module.get<SiteTableService>(SiteTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
