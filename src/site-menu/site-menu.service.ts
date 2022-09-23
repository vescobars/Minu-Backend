import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteMenuService {
  constructor(
    @InjectRepository(RestaurantSiteEntity)
    private readonly siteRepository: Repository<RestaurantSiteEntity>,

    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async addMenuSite(siteId: string, menuId: string): Promise<RestaurantSiteEntity> {
    const menu: MenuEntity = await this.menuRepository.findOne({where: { id: menuId }});
    if (!menu)
      throw new BusinessLogicException('The menu with the given id was not found', BusinessError.NOT_FOUND);

    const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId },relations: ["orders","tables","reviews","restaurantOperators","schedules","promotions","menu","menu"]});
    if (!site)
      throw new BusinessLogicException('The site with the given id was not found',BusinessError.NOT_FOUND);

    site.menu = menu;
    return await this.siteRepository.save(site);
  }

  async findMenuBySiteId(siteId: string): Promise<MenuEntity> {
    const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['menu']});
    if (!site)
      throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);

    return site.menu;
  }

  async associateMenuSite(siteId: string, menu: MenuEntity): Promise<RestaurantSiteEntity> {
    const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['menu']});
    if (!site)
      throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);

    const menuEntity: MenuEntity = await this.menuRepository.findOne({where: { id: menu.id }});
    if (!menuEntity)
      throw new BusinessLogicException('The menu with the given id was not found', BusinessError.NOT_FOUND);

    site.menu = menu;
    return await this.siteRepository.save(site);
  }

  async deleteMenuSite(siteId: string, menuId: string) {
    const menu: MenuEntity = await this.menuRepository.findOne({where: { id: menuId }});
    if (!menu)
      throw new BusinessLogicException('The menu with the given id was not found', BusinessError.NOT_FOUND);

    const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['menu']});
    if (!site)
      throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);

    if (site.menu.id !== menu.id)
      throw new BusinessLogicException('The menu with the given id is not associated to the site', BusinessError.PRECONDITION_FAILED);

    site.menu = null;
    await this.siteRepository.save(site);
  }
}
