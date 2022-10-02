import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MenuDto } from '../menu/menu.dto';
import { MenuEntity } from '../menu/menu.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteMenuService } from './site-menu.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteMenuController {
    constructor(private readonly siteMenuService: SiteMenuService) {}

  @Get(':siteId/menus')
  async findMenuBySiteId(@Param('siteId') siteId: string) {
    return await this.siteMenuService.findMenuBySiteId(siteId);
  }

  @Post(':siteId/menus/:menuId')
  async addMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.siteMenuService.addMenuSite(siteId, menuId);
  }
  
 @Put(':siteId/menus')
  async associateMenuSite(
    @Body() menuDto: MenuDto,
    @Param('siteId') siteId: string,
  ) {
    const menu = plainToInstance(MenuEntity, menuDto);
    return await this.siteMenuService.associateMenuSite(
      siteId,
      menu,
    );
  }

  @Delete(':siteId/menus/:menuId')
  @HttpCode(204)
  async deleteMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.siteMenuService.deleteMenuSite(siteId, menuId);
  }
}
