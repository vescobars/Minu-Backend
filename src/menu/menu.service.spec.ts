import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MenuEntity } from './menu.entity';
import { MenuService } from './menu.service';

import { faker } from '@faker-js/faker';

describe('MenuService', () => {
  let service: MenuService;
  let repository: Repository<MenuEntity>;
  let menusList: MenuEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MenuService],
    }).compile();

    service = module.get<MenuService>(MenuService);
    repository = module.get<Repository<MenuEntity>>(getRepositoryToken(MenuEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    menusList = [];
    for(let i = 0; i < 5; i++){
        const menu: MenuEntity = await repository.save({
        date: faker.date.birthdate(),
        file: faker.company.name()})
        menusList.push(menu);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all menus', async () => {
    const menus: MenuEntity[] = await service.findAll();
    expect(menus).not.toBeNull();
    expect(menus).toHaveLength(menusList.length);
  });

  it('findOne should return a menu by id', async () => {
    const storedMenu: MenuEntity = menusList[0];
    const menu: MenuEntity = await service.findOne(storedMenu.id);
    expect(menu).not.toBeNull();
    expect(menu.date).toEqual(storedMenu.date)
  });

  it('findOne should throw an exception for an invalid menu', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The menu with the given id was not found")
  });

  it('create should return a new menu', async () => {
    const menu: MenuEntity = {
      id: "",
      date: faker.date.birthdate(), 
      file: faker.company.name(),
      categories: [],
      restaurantSite: null,
    }

    const newMenu: MenuEntity = await service.create(menu);
    expect(newMenu).not.toBeNull();

    const storedMenu: MenuEntity = await repository.findOne({where: {id: newMenu.id}})
    expect(storedMenu).not.toBeNull();
    expect(storedMenu.date).toEqual(newMenu.date)
  });

  it('update should modify a menu', async () => {
    const menu: MenuEntity = menusList[0];
    menu.date = faker.date.birthdate();
  
    const updatedMenu: MenuEntity = await service.update(menu.id, menu);
    expect(updatedMenu).not.toBeNull();
  
    const storedMenu: MenuEntity = await repository.findOne({ where: { id: menu.id } })
    expect(storedMenu).not.toBeNull();
    expect(storedMenu.date).toEqual(menu.date)
  });
 
  it('update should throw an exception for an invalid menu', async () => {
    let menu: MenuEntity = menusList[0];
    menu = {
      ...menu, date: faker.date.birthdate()
    }
    await expect(() => service.update("0", menu)).rejects.toHaveProperty("message", "The menu with the given id was not found")
  });

  it('delete should remove a menu', async () => {
    const menu: MenuEntity = menusList[0];
    await service.delete(menu.id);
  
    const deletedMenu: MenuEntity = await repository.findOne({ where: { id: menu.id } })
    expect(deletedMenu).toBeNull();
  });

  it('delete should throw an exception for an invalid menu', async () => {
    const menu: MenuEntity = menusList[0];
    await service.delete(menu.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The menu with the given id was not found")
  });
 
});
