import { Test, TestingModule } from '@nestjs/testing';
import { PlateImageService } from './plate-image.service';

describe('PlateImageService', () => {
  let service: PlateImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateImageService],
    }).compile();

    service = module.get<PlateImageService>(PlateImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
