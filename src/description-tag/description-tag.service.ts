import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';
import { DescriptionTagEntity } from './description-tag.entity';

@Injectable()
export class DescriptionTagService {
    
    constructor(
        @InjectRepository(DescriptionTagEntity)
        private readonly descriptionTagRepository: Repository<DescriptionTagEntity>
    ){}
 
    async findAll(): Promise<DescriptionTagEntity[]> {
        return await this.descriptionTagRepository.find({ relations: [] });
    }

    async findOne(id: string): Promise<DescriptionTagEntity> {
        const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where: {id}, relations: [] } );
        if (!descriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND);
   
        return descriptionTag;
    }

    async create(descriptionTag: DescriptionTagEntity): Promise<DescriptionTagEntity> {
        return await this.descriptionTagRepository.save(descriptionTag);
    }

    async update(id: string, descriptionTag: DescriptionTagEntity): Promise<DescriptionTagEntity> {
        const persisteddescriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where:{id}});
        if (!persisteddescriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.descriptionTagRepository.save({...persisteddescriptionTag, ...descriptionTag});
    }

    async delete(id: string) {
        const descriptionTag: DescriptionTagEntity = await this.descriptionTagRepository.findOne({where:{id}});
        if (!descriptionTag)
          throw new BusinessLogicException("The descriptionTag with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.descriptionTagRepository.remove(descriptionTag);
    }
}
