import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionEntity } from '../promotion/promotion.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SitePromotionService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(PromotionEntity)
        private readonly promotionEntity: Repository<PromotionEntity>
    ) {}

    async addPromotionSite(siteId: string, promotionId: string): Promise<RestaurantSiteEntity> {
        const promotion: PromotionEntity = await this.promotionEntity.findOne({where: {id: promotionId}});
        if (!promotion)
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","reviews","restaurantOperators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.promotions = [...site.promotions, promotion];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findPromotionBySiteIdPromotionId(siteId: string, promotionId: string): Promise<PromotionEntity> {
        const promotion: PromotionEntity = await this.promotionEntity.findOne({where: {id: promotionId}});
        if (!promotion)
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["promotions"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const sitePromotion: PromotionEntity = site.promotions.find(e => e.id === promotion.id);
    
        if (!sitePromotion)
          throw new BusinessLogicException("The promotion with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return sitePromotion;
    }
     
    async findPromotionsBySiteId(siteId: string): Promise<PromotionEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["promotions"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.promotions;
    }
     
    async associatePromotionsSite(siteId: string, promotions: PromotionEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["promotions"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < promotions.length; i++) {
          const promotion: PromotionEntity = await this.promotionEntity.findOne({where: {id: promotions[i].id}});
          if (!promotion)
            throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.promotions = promotions;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deletePromotionSite(siteId: string, promotionId: string){
        const promotion: PromotionEntity = await this.promotionEntity.findOne({where: {id: promotionId}});
        if (!promotion)
          throw new BusinessLogicException("The promotion with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["promotions"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const sitePromotion: PromotionEntity = site.promotions.find(e => e.id === promotion.id);
     
        if (!sitePromotion)
            throw new BusinessLogicException("The promotion with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.promotions = site.promotions.filter(e => e.id !== promotionId);
        await this.restaurantSiteRepository.save(site);
    }
}
