import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuVisualPreferenceEntity])],
  providers: [MenuVisualPreferencesService]
})
export class MenuVisualPreferencesModule {}
