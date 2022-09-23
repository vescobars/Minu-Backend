import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';
import { MenuVisualPreferencesController } from './menu-visual-preferences.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuVisualPreferenceEntity])],
  providers: [MenuVisualPreferencesService],
  controllers: [MenuVisualPreferencesController]
})
export class MenuVisualPreferencesModule {}
