import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { MenuEntity } from '../menu/menu.entity';
import { Repository } from 'typeorm';
import { SiteMenuService } from './site-menu.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SiteMenuService', () => {
  let service: SiteMenuService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let menuRepository: Repository<MenuEntity>;
  let site: RestaurantSiteEntity;
  let menu : MenuEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteMenuService],
    }).compile();

    menuRepository = module.get<Repository<MenuEntity>>(getRepositoryToken(MenuEntity));
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity)); 
    service = module.get<SiteMenuService>(SiteMenuService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    siteRepository.clear();
    menuRepository.clear();
 
    menu = await menuRepository.save({
      date: faker.date.recent(),
    })

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      menu: menu
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addMenuSite should add an menu to a site', async () => {
    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.recent(),
    });
 
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence()
    })
 
    const result: RestaurantSiteEntity = await service.addMenuSite(newSite.id, newMenu.id);
   
    expect(result.menu).not.toBeNull();
    expect(result.menu.date).toEqual(newMenu.date);
  });

  it('addMenuSite should thrown exception for an invalid menu', async () => {
    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.recent(),
    });
 
    await expect(() => service.addMenuSite(newMenu.id, "0")).rejects.toHaveProperty("message", "The menu with the given id was not found");
  });

  it('addMenuSite should throw an exception for an invalid site', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence()
    })
 
    await expect(() => service.addMenuSite("0", newSite.id)).rejects.toHaveProperty("message", "The menu with the given id was not found");
  });

  it('findMenuBySiteIdMenuId should return menu by site', async () => {
    const menuE: MenuEntity = menu;
    const storedMenu: MenuEntity = await service.findMenuBySiteIdMenuId(site.id, menuE.id, )
    expect(storedMenu).not.toBeNull();
    expect(storedMenu.date).toEqual(menuE.date);
  });

  it('findMenuBySiteIdMenuId should throw an exception for an invalid menu', async () => {
    await expect(()=> service.findMenuBySiteIdMenuId(site.id, "0")).rejects.toHaveProperty("message", "The menu with the given id was not found");
  });

  it('findMenuBySiteIdMenuId should throw an exception for an invalid site', async () => {
    const menuE: MenuEntity = menu;
    await expect(()=> service.findMenuBySiteIdMenuId("0", menuE.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findMenuBySiteId should return menu by site', async ()=>{
    const menu: MenuEntity = await service.findMenuBySiteId(site.id);
    expect(menu.date).toEqual(menu.date);
  });

  it('findMenuBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findMenuBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('associateMenuSite should update menu for a site', async () => {
    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.recent(),
    });
 
    const updatedSite: RestaurantSiteEntity = await service.associateMenuSite(site.id, newMenu);
    
    expect(updatedSite.menu.id).toEqual(newMenu.id);
    expect(updatedSite.menu.date).toEqual(newMenu.date);
  });

  it('associateMenuSite should throw an exception for an invalid site', async () => {
    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.recent()
    });
 
    await expect(()=> service.associateMenuSite("0", newMenu)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('associateMenuSite should throw an exception for an invalid menu', async () => {
    const newMenu: MenuEntity = menu;
    newMenu.id = "0";
 
    await expect(()=> service.associateMenuSite(site.id, newMenu)).rejects.toHaveProperty("message", "The menu with the given id was not found");
  });

  it('deleteMenuSite should remove an menu from a site', async () => {
    const menuE: MenuEntity = menu;
   
    await service.deleteMenuSite(site.id, menuE.id);
 
    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations:  ["menu"]});
    const deletedAddress: MenuEntity = storedSite.menu;
 
    expect(deletedAddress).toBeNull();

  });
});
