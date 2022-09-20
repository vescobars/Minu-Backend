import { Test, TestingModule } from '@nestjs/testing';
import { CategoryPlateService } from './category-plate.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PlateEntity } from '../plate/plate.entity';
import { CategoryEntity } from '../category/category.entity';

describe('CategoryPlateService', () => {
  let service: CategoryPlateService;
  let plateRepository: Repository<PlateEntity>;
  let categoryRepository: Repository<CategoryEntity>;
  let plate: PlateEntity;
  let platesList : PlateEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CategoryPlateService],
    }).compile();

    service = module.get<CategoryPlateService>(CategoryPlateService);
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity));
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
