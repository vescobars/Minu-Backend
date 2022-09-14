import { Test, TestingModule } from '@nestjs/testing';
import { ClientImageService } from './client-image.service';

describe('ClientImageService', () => {
  let service: ClientImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientImageService],
    }).compile();

    service = module.get<ClientImageService>(ClientImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
