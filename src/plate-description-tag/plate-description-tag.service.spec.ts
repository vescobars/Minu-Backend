import { Test, TestingModule } from '@nestjs/testing';
import { PlateDescriptionTagService } from './plate-description-tag.service';

describe('PlateDescriptionTagService', () => {
  let service: PlateDescriptionTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateDescriptionTagService],
    }).compile();

    service = module.get<PlateDescriptionTagService>(PlateDescriptionTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
