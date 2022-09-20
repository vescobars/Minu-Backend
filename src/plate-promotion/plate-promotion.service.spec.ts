import { Test, TestingModule } from '@nestjs/testing';
import { PlatePromotionService } from './plate-promotion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PlateEntity } from '../plate/plate.entity';
import { PromotionEntity } from '../promotion/promotion.entity';

describe('PlatePromotionService', () => {
  let service: PlatePromotionService;
  let plateRepository: Repository<PlateEntity>;
  let promotionRepository: Repository<PromotionEntity>;
  let plate: PlateEntity;
  let promotion : PromotionEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlatePromotionService],
    }).compile();

    service = module.get<PlatePromotionService>(PlatePromotionService);
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity));
    promotionRepository = module.get<Repository<PromotionEntity>>(getRepositoryToken(PromotionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
