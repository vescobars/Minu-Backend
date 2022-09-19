import { Test, TestingModule } from '@nestjs/testing';
import { CategoryPlateService } from './category-plate.service';

describe('CategoryPlateService', () => {
  let service: CategoryPlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryPlateService],
    }).compile();

    service = module.get<CategoryPlateService>(CategoryPlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
