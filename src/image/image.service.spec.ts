import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let repository: Repository<ImageEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ImageService],
    }).compile();
 
    service = module.get<ImageService>(ImageService);
    repository = module.get<Repository<ImageEntity>>(
      getRepositoryToken(ImageEntity),
      );
  });
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 });