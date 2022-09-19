import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteAddressService } from './site-address.service';

describe('SiteAddressService', () => {
  let service: SiteAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteAddressService],
    }).compile();

    service = module.get<SiteAddressService>(SiteAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
