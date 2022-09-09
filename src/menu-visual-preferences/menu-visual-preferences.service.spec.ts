import { Test, TestingModule } from '@nestjs/testing';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';

describe('MenuVisualPreferencesService', () => {
  let service: MenuVisualPreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuVisualPreferencesService],
    }).compile();

    service = module.get<MenuVisualPreferencesService>(MenuVisualPreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
