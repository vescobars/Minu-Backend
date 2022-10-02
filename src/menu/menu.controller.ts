import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MenuDto } from './menu.dto';
import { MenuEntity } from './menu.entity';
import { MenuService } from './menu.service';

@Controller('menus')
@UseInterceptors(BusinessErrorsInterceptor)
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll() {
    return await this.menuService.findAll();
  }

  @Get(':menuId')
  async findOne(@Param('menuId') menuId: string) {
    return await this.menuService.findOne(menuId);
  }

  @Post()
  async create(@Body() menuDto: MenuDto) {
    const menu: MenuEntity = plainToInstance(MenuEntity, menuDto);
    menu.date = new Date(menu.date);
    return await this.menuService.create(menu);
  }

  @Put(':menuId')
  async update(@Param('menuId') menuId: string, @Body() menuDto: MenuDto) {
    const menu: MenuEntity = plainToInstance(MenuEntity, menuDto);
    menu.date = new Date(menu.date);
    return await this.menuService.update(menuId, menu);
  }

  @Delete(':menuId')
  @HttpCode(204)
  async delete(@Param('menuId') menuId: string) {
    return await this.menuService.delete(menuId);
  }

}
