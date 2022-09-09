import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';
import { CreateMenuVisualPreferenceDto } from './dto/create-menu-visual-preference.dto';
import { UpdateMenuVisualPreferenceDto } from './dto/update-menu-visual-preference.dto';

@Controller('menu-visual-preferences')
export class MenuVisualPreferencesController {
  constructor(private readonly menuVisualPreferencesService: MenuVisualPreferencesService) {}

  @Post()
  create(@Body() createMenuVisualPreferenceDto: CreateMenuVisualPreferenceDto) {
    return this.menuVisualPreferencesService.create(createMenuVisualPreferenceDto);
  }

  @Get()
  findAll() {
    return this.menuVisualPreferencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuVisualPreferencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuVisualPreferenceDto: UpdateMenuVisualPreferenceDto) {
    return this.menuVisualPreferencesService.update(+id, updateMenuVisualPreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuVisualPreferencesService.remove(+id);
  }
}
