import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteTableService } from './site-table.service';

describe('SiteTableService', () => {
  let service: SiteTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteTableService],
    }).compile();

    service = module.get<SiteTableService>(SiteTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
