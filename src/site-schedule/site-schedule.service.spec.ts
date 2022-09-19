import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteScheduleService } from './site-schedule.service';

describe('SiteScheduleService', () => {
  let service: SiteScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteScheduleService],
    }).compile();

    service = module.get<SiteScheduleService>(SiteScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
