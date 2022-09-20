import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryPlateService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>,

        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>
    ) {}

    async addPlateCategory(categoryId: string, plateId: string): Promise<CategoryEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);
      
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}, relations: ["plates"]})
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND);
    
          category.plates = [...category.plates, plate];
        return await this.categoryRepository.save(category);
      }
    
    async findPlateByCategoryIdPlateId(categoryId: string, plateId: string): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
       
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}, relations: ["plates"]});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
   
        const categoryPlate: PlateEntity = category.plates.find(e => e.id === plate.id);
   
        if (!categoryPlate)
          throw new BusinessLogicException("The plate with the given id is not associated to the category", BusinessError.PRECONDITION_FAILED)
   
        return categoryPlate;
    }
    
    async findPlatesByCategoryId(categoryId: string): Promise<PlateEntity[]> {
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}, relations: ["plates"]});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
       
        return category.plates;
    }
    
    async associatePlatesCategory(categoryId: string, plates: PlateEntity[]): Promise<CategoryEntity> {
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}, relations: ["plates"]});
    
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < plates.length; i++) {
          const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plates[i].id}});
          if (!plate)
            throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        category.plates = plates;
        return await this.categoryRepository.save(category);
      }
    
    async deletePlateCategory(categoryId: string, plateId: string){
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        const category: CategoryEntity = await this.categoryRepository.findOne({where: {id: categoryId}, relations: ["plates"]});
        if (!category)
          throw new BusinessLogicException("The category with the given id was not found", BusinessError.NOT_FOUND)
    
        const categoryPlate: PlateEntity = category.plates.find(e => e.id === plate.id);
    
        if (!categoryPlate)
            throw new BusinessLogicException("The plate with the given id is not associated to the category", BusinessError.PRECONDITION_FAILED)
 
            category.plates = category.plates.filter(e => e.id !== plateId);
        await this.categoryRepository.save(category);
    }  

}
