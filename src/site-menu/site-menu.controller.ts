import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MenuDto } from '../menu/menu.dto';
import { MenuEntity } from '../menu/menu.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteMenuService } from './site-menu.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteMenuController {
    constructor(private readonly siteMenuService: SiteMenuService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/menus')
  async findMenuBySiteId(@Param('siteId') siteId: string) {
    return await this.siteMenuService.findMenuBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/menus/:menuId')
  async addMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.siteMenuService.addMenuSite(siteId, menuId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)  
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/menus/:menuId')
  @HttpCode(204)
  async deleteMenuSite(
    @Param('siteId') siteId: string,
    @Param('menuId') menuId: string,
  ) {
    return await this.siteMenuService.deleteMenuSite(siteId, menuId);
  }
}
