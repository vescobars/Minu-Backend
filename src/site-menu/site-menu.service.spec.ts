import { Test, TestingModule } from '@nestjs/testing';
import { SiteMenuService } from './site-menu.service';

describe('SiteMenuService', () => {
  let service: SiteMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteMenuService],
    }).compile();

    service = module.get<SiteMenuService>(SiteMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
