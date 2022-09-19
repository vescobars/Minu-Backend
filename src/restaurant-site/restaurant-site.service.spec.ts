import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';

describe('RestaurantSiteService', () => {
  let service: RestaurantSiteService;
  let repository: Repository<RestaurantSiteEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantSiteService],
    }).compile();
 
    service = module.get<RestaurantSiteService>(RestaurantSiteService);
    repository = module.get<Repository<RestaurantSiteEntity>>(
      getRepositoryToken(RestaurantSiteEntity),
      );
  });
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 });