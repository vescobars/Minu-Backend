import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { MenuEntity } from '../menu/menu.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class MenuCategoryService {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>,
     
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>
    ) {}

    async addCategoryMenu(menuId: string, categoryId: string): Promise<MenuEntity> {
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
       
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id: menuId}, relations: ["categories"]}) 
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND);
     
        menu.categories = [...menu.categories, category];
        return await this.menuRepository.save(menu);
      }
     
    async findCategoryByMenuIdCategoryId(menuId: string, categoryId: string): Promise<CategoryEntity> {
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
        
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id: menuId}, relations: ["categories"]}); 
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND)
    
        const menuCategory: CategoryEntity = menu.categories.find(e => e.id === category.id);
    
        if (!menuCategory)
          throw new BusinessLogicException("The category with the given id is not associated to the menu", BusinessError.PRECONDITION_FAILED)
    
        return menuCategory;
    }
     
    async findCategorysByMenuId(menuId: string): Promise<CategoryEntity[]> {
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id: menuId}, relations: ["categories"]});
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND)
        
        return menu.categories;
    }
     
    async associateCategorysMenu(menuId: string, categories: CategoryEntity[]): Promise<MenuEntity> {
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id: menuId}, relations: ["categories"]});
     
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < categories.length; i++) {
          const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categories[i].id}});
          if (!category)
            throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        menu.categories = categories;
        return await this.menuRepository.save(menu);
      }
     
    async deleteCategoryMenu(menuId: string, categoryId: string){
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
     
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id: menuId}, relations: ["categories"]});
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND)
     
        const menuCategory: CategoryEntity = menu.categories.find(e => e.id === category.id);
     
        if (!menuCategory)
            throw new BusinessLogicException("The category with the given id is not associated to the menu", BusinessError.PRECONDITION_FAILED)

        menu.categories = menu.categories.filter(e => e.id !== categoryId);
        await this.menuRepository.save(menu);
    }   
}
