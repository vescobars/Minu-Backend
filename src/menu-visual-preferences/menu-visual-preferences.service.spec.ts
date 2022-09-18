import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';

describe('MenuVisualPreferencesService', () => {
  let service: MenuVisualPreferencesService;
  let repository: Repository<MenuVisualPreferenceEntity>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MenuVisualPreferencesService],
    }).compile();
 
    service = module.get<MenuVisualPreferencesService>(MenuVisualPreferencesService);
    repository = module.get<Repository<MenuVisualPreferenceEntity>>(
      getRepositoryToken(MenuVisualPreferenceEntity),
      );
  });
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 });
