import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntity } from '../category/category.entity';
import { Repository } from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { MenuCategoryService } from './menu-category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('MenuCategoryService', () => {
  let service: MenuCategoryService;
  let menuRepository: Repository<MenuEntity>;
  let categoryRepository: Repository<CategoryEntity>;
  let menu: MenuEntity;
  let categoriesList : CategoryEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MenuCategoryService],
    }).compile();

    service = module.get<MenuCategoryService>(MenuCategoryService);
    menuRepository = module.get<Repository<MenuEntity>>(getRepositoryToken(MenuEntity));
    categoryRepository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    categoryRepository.clear();
    menuRepository.clear();

    categoriesList = [];
    for(let i = 0; i < 5; i++){
        const category: CategoryEntity = await categoryRepository.save({
          name: faker.company.name()
        })
        categoriesList.push(category);
    }

    menu = await menuRepository.save({
      date: faker.date.birthdate(),
      file: faker.company.name(),
      categories: categoriesList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addCategoryMenu should add an category to a menu', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name() 
    });

    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.birthdate(),
      file: faker.company.name()
    })

    const result: MenuEntity = await service.addCategoryMenu(newMenu.id, newCategory.id);
    
    expect(result.categories.length).toBe(1);
    expect(result.categories[0]).not.toBeNull();
    expect(result.categories[0].name).toBe(newCategory.name)
  });

  it('addCategoryMenu should thrown exception for an invalid category', async () => {
    const newMenu: MenuEntity = await menuRepository.save({
      date: faker.date.birthdate(),
        file: faker.company.name()
    })

    await expect(() => service.addCategoryMenu(newMenu.id, "0")).rejects.toHaveProperty("message", "The category with the given id was not found");
  });

  it('addCategoryMenu should throw an exception for an invalid menu', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name() 
    });

    await expect(() => service.addCategoryMenu("0", newCategory.id)).rejects.toHaveProperty("message", "The menu with the given id was not found");
  });
  

  it('findCategoryByMenuIdCategoryId should return category by menu', async () => {
    const category: CategoryEntity = categoriesList[0];
    const storedCategory: CategoryEntity = await service.findCategoryByMenuIdCategoryId(menu.id, category.id)
    expect(storedCategory).not.toBeNull();
    expect(storedCategory.name).toBe(category.name);

  });
  

  it('findCategoryByMenuIdCategoryId should throw an exception for an invalid category', async () => {
    await expect(()=> service.findCategoryByMenuIdCategoryId(menu.id, "0")).rejects.toHaveProperty("message", "The category with the given id was not found"); 
  });

  it('findCategoryByMenuIdCategoryId should throw an exception for an invalid menu', async () => {
    const category: CategoryEntity = categoriesList[0]; 
    await expect(()=> service.findCategoryByMenuIdCategoryId("0", category.id)).rejects.toHaveProperty("message", "The menu with the given id was not found"); 
  });

  it('findCategoryByMenuIdCategoryId should throw an exception for an category not associated to the menu', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name() 
    });

    await expect(()=> service.findCategoryByMenuIdCategoryId(menu.id, newCategory.id)).rejects.toHaveProperty("message", "The category with the given id is not associated to the menu"); 
  });

  
  it('findCategorysByMenuId should return categorys by menu', async ()=>{
    const categorys: CategoryEntity[] = await service.findCategorysByMenuId(menu.id);
    expect(categorys.length).toBe(5)
  });
  


  it('findCategorysByMenuId should throw an exception for an invalid menu', async () => {
    await expect(()=> service.findCategorysByMenuId("0")).rejects.toHaveProperty("message", "The menu with the given id was not found"); 
  });

  it('associateCategorysMenu should update categorys list for a menu', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name() 
    });

    const updatedMenu: MenuEntity = await service.associateCategorysMenu(menu.id, [newCategory]);
    expect(updatedMenu.categories.length).toBe(1);

    expect(updatedMenu.categories[0].name).toBe(newCategory.name);
  });

  it('associateCategorysMenu should throw an exception for an invalid menu', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name() 
    });

    await expect(()=> service.associateCategorysMenu("0", [newCategory])).rejects.toHaveProperty("message", "The menu with the given id was not found"); 
  });

  it('associateCategorysMenu should throw an exception for an invalid category', async () => {
    const newCategory: CategoryEntity = categoriesList[0];
    newCategory.id = "0";

    await expect(()=> service.associateCategorysMenu(menu.id, [newCategory])).rejects.toHaveProperty("message", "The category with the given id was not found"); 
  });

  
  it('deleteCategoryToMenu should remove an category from a menu', async () => {
    const category: CategoryEntity = categoriesList[0];
    
    await service.deleteCategoryMenu(menu.id, category.id);

    const storedMenu: MenuEntity = await menuRepository.findOne({where: {id: menu.id}, relations: ["categories"]});
    const deletedCategory: CategoryEntity = storedMenu.categories.find(a => a.id === category.id);

    expect(deletedCategory).toBeUndefined();

  });
  

  it('deleteCategoryToMenu should thrown an exception for an invalid category', async () => {
    await expect(()=> service.deleteCategoryMenu(menu.id, "0")).rejects.toHaveProperty("message", "The category with the given id was not found"); 
  });

  it('deleteCategoryToMenu should thrown an exception for an invalid menu', async () => {
    const category: CategoryEntity = categoriesList[0];
    await expect(()=> service.deleteCategoryMenu("0", category.id)).rejects.toHaveProperty("message", "The menu with the given id was not found"); 
  });

  it('deleteCategoryToMenu should thrown an exception for an non asocciated category', async () => {
    const newCategory: CategoryEntity = await categoryRepository.save({
      name: faker.company.name(), 
      year: parseInt(faker.random.numeric()),
      description: faker.lorem.sentence(),
      type: "Painting",
      mainImage: faker.image.imageUrl()
    });

    await expect(()=> service.deleteCategoryMenu(menu.id, newCategory.id)).rejects.toHaveProperty("message", "The category with the given id is not associated to the menu"); 
  }); 

});