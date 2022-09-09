import { Injectable } from '@nestjs/common';
import { CreateMenuVisualPreferenceDto } from './dto/create-menu-visual-preference.dto';
import { UpdateMenuVisualPreferenceDto } from './dto/update-menu-visual-preference.dto';

@Injectable()
export class MenuVisualPreferencesService {
  create(createMenuVisualPreferenceDto: CreateMenuVisualPreferenceDto) {
    return 'This action adds a new menuVisualPreference';
  }

  findAll() {
    return `This action returns all menuVisualPreferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menuVisualPreference`;
  }

  update(id: number, updateMenuVisualPreferenceDto: UpdateMenuVisualPreferenceDto) {
    return `This action updates a #${id} menuVisualPreference`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuVisualPreference`;
  }
}
