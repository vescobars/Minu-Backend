import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlateEntity } from '../plate/plate.entity';
import { PromotionEntity } from '../promotion/promotion.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PlatePromotionService {

    constructor(
        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>,

        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>
    ){}
    
    async addPromotionPlate(plateId: string, promotionId: string): Promise<PlateEntity> {
      const promotion: PromotionEntity = await this.promotionRepository.findOne({where: { id: promotionId }});
      if (!promotion)
        throw new BusinessLogicException('The promotion with the given id was not found', BusinessError.NOT_FOUND);
  
      const plate: PlateEntity = await this.plateRepository.findOne({where: { id: plateId },relations: ["orders","tables","reviews","restaurantOperators","schedules","promotions","promotion","promotion"]});
      if (!plate)
        throw new BusinessLogicException('The plate with the given id was not found',BusinessError.NOT_FOUND);
  
      plate.promotion = promotion;
      return await this.plateRepository.save(plate);
    }
  
    async findPromotionByPlateId(plateId: string): Promise<PromotionEntity> {
      const plate: PlateEntity = await this.plateRepository.findOne({where: { id: plateId }, relations: ['promotion']});
      if (!plate)
        throw new BusinessLogicException('The plate with the given id was not found', BusinessError.NOT_FOUND);
  
      return plate.promotion;
    }
  
    async associatePromotionPlate(plateId: string, promotion: PromotionEntity): Promise<PlateEntity> {
      const plate: PlateEntity = await this.plateRepository.findOne({where: { id: plateId }, relations: ['promotion']});
      if (!plate)
        throw new BusinessLogicException('The plate with the given id was not found', BusinessError.NOT_FOUND);
  
      const menuEntity: PromotionEntity = await this.promotionRepository.findOne({where: { id: promotion.id }});
      if (!menuEntity)
        throw new BusinessLogicException('The promotion with the given id was not found', BusinessError.NOT_FOUND);
  
      plate.promotion = promotion;
      return await this.plateRepository.save(plate);
    }
  
    async deletePromotionPlate(plateId: string, promotionId: string) {
      const promotion: PromotionEntity = await this.promotionRepository.findOne({where: { id: promotionId }});
      if (!promotion)
        throw new BusinessLogicException('The promotion with the given id was not found', BusinessError.NOT_FOUND);
  
      const plate: PlateEntity = await this.plateRepository.findOne({where: { id: plateId }, relations: ['promotion']});
      if (!plate)
        throw new BusinessLogicException('The plate with the given id was not found', BusinessError.NOT_FOUND);
  
      if (plate.promotion.id !== promotion.id)
        throw new BusinessLogicException('The promotion with the given id is not associated to the plate', BusinessError.PRECONDITION_FAILED);
  
      plate.promotion = null;
      await this.plateRepository.save(plate);
    }
    
}
