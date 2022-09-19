import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { faker } from '@faker-js/faker';
import { PlateEntity } from 'src/plate/plate.entity';
import { MenuEntity } from 'src/menu/menu.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<CategoryEntity>;
  const categoriesList = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<CategoryEntity>>(getRepositoryToken(CategoryEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for(let i = 0; i < 5; i++){
        const category: CategoryEntity = await repository.save({
          id: faker.datatype.uuid(),
          name: faker.datatype.string()
        })
        categoriesList.push(category);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all categories', async () => {
    const categories: CategoryEntity[] = await service.findAll();
    expect(categories).not.toBeNull();
    expect(categories).toHaveLength(categoriesList.length);
  });

  it('findOne should return a category by id', async () => {
    const storedCategory: CategoryEntity = categoriesList[0];
    const category: CategoryEntity = await service.findOne(storedCategory.id);
    expect(category).not.toBeNull();
    expect(category.name).toEqual(storedCategory.name)
  });

  it('create should return a new category', async () => {
    const category: CategoryEntity = {
      id: "",
      name: faker.datatype.string(),
      plates: [],
      menu: new MenuEntity()
    }
 
    const newCategory: CategoryEntity = await service.create(category);
    expect(newCategory).not.toBeNull();
 
    const storedCategory: CategoryEntity = await repository.findOne({where: {id: newCategory.id}})
    expect(storedCategory).not.toBeNull();
    expect(storedCategory.name).toEqual(newCategory.name)
  });

  it('update should modify a category', async () => {
    const category: CategoryEntity = categoriesList[0];
    category.name = "New name";
     const updatedCategory: CategoryEntity = await service.update(category.id, category);
    expect(updatedCategory).not.toBeNull();
     const storedCategory: CategoryEntity = await repository.findOne({ where: { id: category.id } })
    expect(storedCategory).not.toBeNull();
    expect(storedCategory.name).toEqual(category.name)
  });

  it('delete should remove a category', async () => {
    const category: CategoryEntity = categoriesList[0];
    await service.delete(category.id);
     const deletedCategory: CategoryEntity = await repository.findOne({ where: { id: category.id } })
    expect(deletedCategory).toBeNull();
  });
});
