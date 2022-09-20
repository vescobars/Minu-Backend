import { Test, TestingModule } from '@nestjs/testing';
import { PlateImageService } from './plate-image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PlateEntity } from '../plate/plate.entity';
import { ImageEntity } from '../image/image.entity';

describe('PlateImageService', () => {
  let service: PlateImageService;
  let plateRepository: Repository<PlateEntity>;
  let imageRepository: Repository<ImageEntity>;
  let plate: PlateEntity;
  let imagesList : ImageEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlateImageService],
    }).compile();

    service = module.get<PlateImageService>(PlateImageService);
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity));
    imageRepository = module.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
