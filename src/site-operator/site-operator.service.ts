import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
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
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","tables","reviews","operators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.operators = [...site.operators, operator];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findOperatorBySiteIdOperatorId(siteId: string, operatorId: string): Promise<RestaurantOperatorEntity> {
        const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operatorId}});
        if (!operator)
          throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["operators"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteOperator: RestaurantOperatorEntity = site.operators.find(e => e.id === operator.id);
    
        if (!siteOperator)
          throw new BusinessLogicException("The operator with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteOperator;
    }
     
    async findOperatorsBySiteId(siteId: string): Promise<RestaurantOperatorEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["operators"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.operators;
    }
     
    async associateOperatorsSite(siteId: string, operators: RestaurantOperatorEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["operators"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < operators.length; i++) {
          const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operators[i].id}});
          if (!operator)
            throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.operators = operators;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteOperatorSite(siteId: string, operatorId: string){
        const operator: RestaurantOperatorEntity = await this.operatorEntity.findOne({where: {id: operatorId}});
        if (!operator)
          throw new BusinessLogicException("The operator with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["operators"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteOperator: RestaurantOperatorEntity = site.operators.find(e => e.id === operator.id);
     
        if (!siteOperator)
            throw new BusinessLogicException("The operator with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.operators = site.operators.filter(e => e.id !== operatorId);
        await this.restaurantSiteRepository.save(site);
    }
}
