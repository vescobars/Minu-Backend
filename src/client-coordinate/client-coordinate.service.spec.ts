import { Test, TestingModule } from '@nestjs/testing';
import { ClientCoordinateService } from './client-coordinate.service';

describe('ClientCoordinateService', () => {
  let service: ClientCoordinateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientCoordinateService],
    }).compile();

    service = module.get<ClientCoordinateService>(ClientCoordinateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
