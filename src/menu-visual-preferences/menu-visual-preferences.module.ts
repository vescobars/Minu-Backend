import { Module } from '@nestjs/common';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';
import { MenuVisualPreferencesController } from './menu-visual-preferences.controller';

@Module({
  controllers: [MenuVisualPreferencesController],
  providers: [MenuVisualPreferencesService]
})
export class MenuVisualPreferencesModule {}
