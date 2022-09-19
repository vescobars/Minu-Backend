import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';
import { faker } from '@faker-js/faker';

describe('MenuVisualPreferencesService', () => {
  let service: MenuVisualPreferencesService;
  let repository: Repository<MenuVisualPreferenceEntity>;
  let menuVisualPrefsList: MenuVisualPreferenceEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MenuVisualPreferencesService],
    }).compile();
 
    service = module.get<MenuVisualPreferencesService>(MenuVisualPreferencesService);
    repository = module.get<Repository<MenuVisualPreferenceEntity>>(getRepositoryToken(MenuVisualPreferenceEntity),);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    menuVisualPrefsList = [];
    for(let i = 0; i < 5; i++){
        const menuVisualPref: MenuVisualPreferenceEntity = await repository.save({
        name: faker.company.name(), 
        file: faker.lorem.sentence()})
        menuVisualPrefsList.push(menuVisualPref);
    }
  }
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all menuVisualPrefs', async () => {
    const menuVisualPrefs: MenuVisualPreferenceEntity[] = await service.findAll();
    expect(menuVisualPrefs).not.toBeNull();
    expect(menuVisualPrefs).toHaveLength(menuVisualPrefsList.length);
  });

  it('findOne should return a menuVisualPref by id', async () => {
    const storedMenuVisualPref: MenuVisualPreferenceEntity = menuVisualPrefsList[0];
    const menuVisualPref: MenuVisualPreferenceEntity = await service.findOne(storedMenuVisualPref.id);
    expect(menuVisualPref).not.toBeNull();
    expect(menuVisualPref.name).toEqual(storedMenuVisualPref.name)
    expect(menuVisualPref.file).toEqual(storedMenuVisualPref.file)
  });

  it('findOne should throw an exception for an invalid menuVisualPref', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The menuVisualPreference with the given id was not found")
  });

  it('create should return a new menuVisualPref', async () => {
    const menuVisualPref: MenuVisualPreferenceEntity = {
      id: "",
      name: faker.company.name(), 
      file: faker.lorem.sentence(), 
      menu: null,
    }

    const newMenuVisualPref: MenuVisualPreferenceEntity = await service.create(menuVisualPref);
    expect(newMenuVisualPref).not.toBeNull();

    const storedMenuVisualPref: MenuVisualPreferenceEntity = await repository.findOne({where: {id: newMenuVisualPref.id}})
    expect(storedMenuVisualPref).not.toBeNull();
    expect(storedMenuVisualPref.name).toEqual(newMenuVisualPref.name)
    expect(storedMenuVisualPref.file).toEqual(newMenuVisualPref.file)
  });

  it('update should modify a menuVisualPref', async () => {
    const menuVisualPref: MenuVisualPreferenceEntity = menuVisualPrefsList[0];
    menuVisualPref.name = "New name";
    menuVisualPref.file = "New file";
  
    const updatedMuseum: MenuVisualPreferenceEntity = await service.update(menuVisualPref.id, menuVisualPref);
    expect(updatedMuseum).not.toBeNull();
  
    const storedMenuVisualPref: MenuVisualPreferenceEntity = await repository.findOne({ where: { id: menuVisualPref.id } })
    expect(storedMenuVisualPref).not.toBeNull();
    expect(storedMenuVisualPref.name).toEqual(menuVisualPref.name)
    expect(storedMenuVisualPref.file).toEqual(menuVisualPref.file)
  });
 
  it('update should throw an exception for an invalid menuVisualPref', async () => {
    let menuVisualPref: MenuVisualPreferenceEntity = menuVisualPrefsList[0];
    menuVisualPref = {
      ...menuVisualPref, name: "New name", file: "New file"
    }
    await expect(() => service.update("0", menuVisualPref)).rejects.toHaveProperty("message", "The menuVisualPreference with the given id was not found")
  });

  it('delete should remove a menuVisualPref', async () => {
    const menuVisualPref: MenuVisualPreferenceEntity = menuVisualPrefsList[0];
    await service.delete(menuVisualPref.id);
  
    const deletedMuseum: MenuVisualPreferenceEntity = await repository.findOne({ where: { id: menuVisualPref.id } })
    expect(deletedMuseum).toBeNull();
  });

  it('delete should throw an exception for an invalid menuVisualPref', async () => {
    const menuVisualPref: MenuVisualPreferenceEntity = menuVisualPrefsList[0];
    await service.delete(menuVisualPref.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The menuVisualPreference with the given id was not found")
  });

 });