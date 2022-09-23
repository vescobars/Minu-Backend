import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
//import { MenuDto } from '../menu/menu.dto';
import { MenuEntity } from '../menu/menu.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteMenuService } from './site-menu.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteMenuController {
    constructor(private readonly SiteMenuService: SiteMenuService) {}

  @Get(':siteId/menus')
  async findMenuBySiteId(@Param('siteId') siteId: string) {
    return await this.SiteMenuService.findMenuBySiteId(siteId);
  }

  @Post(':siteId/menus/:menuId')
  async addMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.SiteMenuService.addMenuSite(siteId, menuId);
  }
  
 
 /* //Waiting for MenuDto implementation by penichejr
 @Put(':siteId/menus')
  async associateMenuSite(
    @Body() menuDto: MenuDto,
    @Param('siteId') siteId: string,
  ) {
    const menu = plainToInstance(MenuEntity, menuDto);
    return await this.SiteMenuService.associateMenuSite(
      siteId,
      menu,
    );
  } */

  @Delete(':siteId/menus/:menuId')
  @HttpCode(204)
  async deleteMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.SiteMenuService.deleteMenuSite(siteId, menuId);
  }
}
