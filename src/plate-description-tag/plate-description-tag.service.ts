import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DescriptionTagEntity } from '../description-tag/description-tag.entity';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PlateDescriptionTagService {
    constructor(
        @InjectRepository(DescriptionTagEntity)
        private readonly descriptionTagRepository: Repository<DescriptionTagEntity>,

        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>
    ){}

    async addDescriptionTagPlate(plateId: string, descriptionTagId: string): Promise<PlateEntity> {
        const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where: {id: descriptionTagId}});
        if (!descriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND);
      
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["descriptionTags", "exhibitions"]})
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);
    
        plate.descriptionTags = [...plate.descriptionTags, descriptionTag];
        return await this.plateRepository.save(plate);
      }
    
    async findDescriptionTagByPlateIdDescriptionTagId(plateId: string, descriptionTagId: string): Promise<DescriptionTagEntity> {
        const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where: {id: descriptionTagId}});
        if (!descriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND)
       
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["descriptionTags"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
   
        const plateDescriptionTag: DescriptionTagEntity = plate.descriptionTags.find(e => e.id === descriptionTag.id);
   
        if (!plateDescriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id is not associated to the plate", BusinessError.PRECONDITION_FAILED)
   
        return plateDescriptionTag;
    }
    
    async findDescriptionTagsByPlateId(plateId: string): Promise<DescriptionTagEntity[]> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["descriptionTags"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
       
        return plate.descriptionTags;
    }
    
    async associateDescriptionTagsPlate(plateId: string, descriptionTags: DescriptionTagEntity[]): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["descriptionTags"]});
    
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < descriptionTags.length; i++) {
          const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where: {id: descriptionTags[i].id}});
          if (!descriptionTag)
            throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        plate.descriptionTags = descriptionTags;
        return await this.plateRepository.save(plate);
      }
    
    async deleteDescriptionTagPlate(plateId: string, descriptionTagId: string){
        const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where: {id: descriptionTagId}});
        if (!descriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND)
    
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["descriptionTags"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        const plateDescriptionTag: DescriptionTagEntity = plate.descriptionTags.find(e => e.id === descriptionTag.id);
    
        if (!plateDescriptionTag)
            throw new BusinessLogicException("The descriptionTag with the given id is not associated to the plate", BusinessError.PRECONDITION_FAILED)
 
        plate.descriptionTags = plate.descriptionTags.filter(e => e.id !== descriptionTagId);
        await this.plateRepository.save(plate);
    }  
}
