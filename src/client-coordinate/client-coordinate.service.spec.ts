import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClientCoordinateService } from './client-coordinate.service';

describe('ClientCoordinateService', () => {
  let service: ClientCoordinateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientCoordinateService],
    }).compile();

    service = module.get<ClientCoordinateService>(ClientCoordinateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
