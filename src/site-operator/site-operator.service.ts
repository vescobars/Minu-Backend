import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteOperatorService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(RestaurantOperatorEntity)
        private readonly operatorEntity: Repository<RestaurantOperatorEntity>
    ) {}

    async addOperatorSite(siteId: string, operatorId: string): Promise<RestaurantSiteEntity> {
        const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operatorId}});
        if (!operator)
          throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","tables","reviews","restaurantOperators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.restaurantOperators = [...site.restaurantOperators, operator];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findOperatorBySiteIdOperatorId(siteId: string, operatorId: string): Promise<RestaurantOperatorEntity> {
        const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operatorId}});
        if (!operator)
          throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["restaurantOperators"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteOperator: RestaurantOperatorEntity = site.restaurantOperators.find(e => e.id === operator.id);
    
        if (!siteOperator)
          throw new BusinessLogicException("The operator with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteOperator;
    }
     
    async findOperatorsBySiteId(siteId: string): Promise<RestaurantOperatorEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["restaurantOperators"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.restaurantOperators;
    }
     
    async associateOperatorsSite(siteId: string, restaurantOperators: RestaurantOperatorEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["restaurantOperators"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < restaurantOperators.length; i++) {
          const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: restaurantOperators[i].id}});
          if (!operator)
            throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.restaurantOperators = restaurantOperators;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteOperatorSite(siteId: string, operatorId: string){
        const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operatorId}});
        if (!operator)
          throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["restaurantOperators"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteOperator: RestaurantOperatorEntity = site.restaurantOperators.find(e => e.id === operator.id);
     
        if (!siteOperator)
            throw new BusinessLogicException("The operator with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.restaurantOperators = site.restaurantOperators.filter(e => e.id !== operatorId);
        await this.restaurantSiteRepository.save(site);
    }
}
