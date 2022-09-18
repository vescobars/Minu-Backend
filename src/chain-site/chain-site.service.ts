import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ChainSiteService {
    constructor(
        @InjectRepository(RestaurantChainEntity)
        private readonly restaurantChainRepository: Repository<RestaurantChainEntity>,
    
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteEntity: Repository<RestaurantSiteEntity>
    ) {}

    async addSiteChain(chainId: string, siteId: string): Promise<RestaurantChainEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteEntity.findOne({where: {id: siteId}});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
      
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({where: {id: chainId}, relations: ["restaurantSites"]})
        if (!chain)
          throw new BusinessLogicException("The chain with the given id was not found", BusinessError.NOT_FOUND);
    
        chain.restaurantSites = [...chain.restaurantSites, site];
        return await this.restaurantChainRepository.save(chain);
      }
    
    async findSiteByChainIdSiteId(chainId: string, siteId: string): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteEntity.findOne({where: {id: siteId}});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
       
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({where: {id: chainId}, relations: ["restaurantSites"]});
        if (!chain)
          throw new BusinessLogicException("The chain with the given id was not found", BusinessError.NOT_FOUND)
   
        const chainSite: RestaurantSiteEntity = chain.restaurantSites.find(e => e.id === site.id);
   
        if (!chainSite)
          throw new BusinessLogicException("The site with the given id is not associated to the chain", BusinessError.PRECONDITION_FAILED)
   
        return chainSite;
    }
    
    async findSitesByChainId(chainId: string): Promise<RestaurantSiteEntity[]> {
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({where: {id: chainId}, relations: ["restaurantSites"]});
        if (!chain)
          throw new BusinessLogicException("The chain with the given id was not found", BusinessError.NOT_FOUND)
       
        return chain.restaurantSites;
    }
    
    async associateSitesMuseum(chainId: string, restaurantSites: RestaurantSiteEntity[]): Promise<RestaurantChainEntity> {
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({where: {id: chainId}, relations: ["restaurantSites"]});
    
        if (!chain)
          throw new BusinessLogicException("The chain with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < restaurantSites.length; i++) {
          const site: RestaurantSiteEntity = await this.restaurantSiteEntity.findOne({where: {id: restaurantSites[i].id}});
          if (!site)
            throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        chain.restaurantSites = restaurantSites;
        return await this.restaurantChainRepository.save(chain);
      }
    
    async deleteSiteChain(chainId: string, siteId: string){
        const site: RestaurantSiteEntity = await this.restaurantSiteEntity.findOne({where: {id: siteId}});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({where: {id: chainId}, relations: ["restaurantSites"]});
        if (!chain)
          throw new BusinessLogicException("The chain with the given id was not found", BusinessError.NOT_FOUND)
    
        const chainSite: RestaurantSiteEntity = chain.restaurantSites.find(e => e.id === site.id);
    
        if (!chainSite)
            throw new BusinessLogicException("The site with the given id is not associated to the chain", BusinessError.PRECONDITION_FAILED)
 
        chain.restaurantSites = chain.restaurantSites.filter(e => e.id !== siteId);
        await this.restaurantChainRepository.save(chain);
    }  
}
