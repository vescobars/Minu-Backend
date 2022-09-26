import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';
import { Repository } from 'typeorm';
import { PromotionEntity } from './promotion.entity';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>
    ){}

    async findAll(): Promise<PromotionEntity[]> {
        return await this.promotionRepository.find({ relations: [] });
    }
 
    async findOne(id: string): Promise<PromotionEntity> {
        const promotion: PromotionEntity = await this.promotionRepository.findOne({where: {id}, relations: [] } );
        if (!promotion){
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND);
        }
        return promotion;
    }
   
    async create(promotion: PromotionEntity): Promise<PromotionEntity> {
        return await this.promotionRepository.save(promotion);
    }
 
    async update(id: string, promotion: PromotionEntity): Promise<PromotionEntity> {
        const persistedPromotion: PromotionEntity = await this.promotionRepository.findOne({where:{id}});
        if (!persistedPromotion){
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND);
        }
       
        promotion.id = id; 
       
        return await this.promotionRepository.save(promotion);
    }
 
    async delete(id: string) {
        const promotion: PromotionEntity = await this.promotionRepository.findOne({where:{id}});
        if (!promotion){
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND);
        }
        await this.promotionRepository.remove(promotion);
    }
}
