import { Test, TestingModule } from '@nestjs/testing';
import { SiteAddressService } from './site-address.service';

describe('SiteAddressService', () => {
  let service: SiteAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteAddressService],
    }).compile();

    service = module.get<SiteAddressService>(SiteAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
