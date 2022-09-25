import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlateEntity } from '../plate/plate.entity';
import { PromotionEntity } from '../promotion/promotion.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

@Injectable()
export class PlatePromotionService {

    constructor(
        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>,

        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>
    ){}
    
    async getPromotionByPlateId(plateId: string): Promise<PromotionEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["promotions"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
       
        return plate.promotion;
    }
    
    /**
    async associatePromotionsPlate(plateId: string, promotions: PromotionEntity): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["promotions"]});
    
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < promotions.length; i++) {
          const promotion: PromotionEntity = await this.promotionRepository.findOne({where: {id: promotions[i].id}});
          if (!promotion)
            throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        plate.promotions = promotions;
        return await this.plateRepository.save(plate);
      }
      */
    
      /*
    async deletePromotionPlate(plateId: string, promotionId: string){
        const promotion: PromotionEntity = await this.promotionRepository.findOne({where: {id: promotionId}});
        if (!promotion)
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND)
    
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}, relations: ["promotions"]});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        const platePromotion: PromotionEntity = plate.promotions.find(e => e.id === promotion.id);
    
        if (!platePromotion)
            throw new BusinessLogicException("The promotion with the given id is not associated to the plate", BusinessError.PRECONDITION_FAILED)
 
            plate.promotions = plate.promotions.filter(e => e.id !== promotionId);
        await this.plateRepository.save(plate);
    }  */
    
}
