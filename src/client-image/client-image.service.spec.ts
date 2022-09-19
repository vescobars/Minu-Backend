import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClientImageService } from './client-image.service';

describe('ClientImageService', () => {
  let service: ClientImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientImageService],
    }).compile();

    service = module.get<ClientImageService>(ClientImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
