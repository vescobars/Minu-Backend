import { Test, TestingModule } from '@nestjs/testing';
import { PlateDescriptionTagService } from './plate-description-tag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PlateEntity } from '../plate/plate.entity';
import { DescriptionTagEntity } from '../description-tag/description-tag.entity';

describe('PlateDescriptionTagService', () => {
  let service: PlateDescriptionTagService;
  let plateRepository: Repository<PlateEntity>;
  let descriptionTagRepository: Repository<DescriptionTagEntity>;
  let plate: PlateEntity;
  let tagsList : DescriptionTagEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlateDescriptionTagService],
    }).compile();

    service = module.get<PlateDescriptionTagService>(PlateDescriptionTagService);
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity));
    descriptionTagRepository = module.get<Repository<DescriptionTagEntity>>(getRepositoryToken(DescriptionTagEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
