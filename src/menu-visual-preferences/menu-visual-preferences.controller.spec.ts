import { Test, TestingModule } from '@nestjs/testing';
import { MenuVisualPreferencesController } from './menu-visual-preferences.controller';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';

describe('MenuVisualPreferencesController', () => {
  let controller: MenuVisualPreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuVisualPreferencesController],
      providers: [MenuVisualPreferencesService],
    }).compile();

    controller = module.get<MenuVisualPreferencesController>(MenuVisualPreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
