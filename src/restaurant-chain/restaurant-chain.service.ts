import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RestaurantChainEntity } from './restaurant-chain.entity';

@Injectable()
export class RestaurantChainService {
    constructor(
        @InjectRepository(RestaurantChainEntity)
        private readonly restaurantChainRepository: Repository<RestaurantChainEntity>
    ){}

    async findAll(): Promise<RestaurantChainEntity[]> {
        return await this.restaurantChainRepository.find({
            relations: ["restaurantSites"] 
        });
    }

    async findOne(id: string): Promise<RestaurantChainEntity> {
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({
            where: {id}, 
            relations: ["restaurantSites"]
        });
        if (!chain)
          throw new BusinessLogicException(
            "The restaurant chain with the given id was not found", 
            BusinessError.NOT_FOUND
          );
   
        return chain;
    }

    async create(chain: RestaurantChainEntity): Promise<RestaurantChainEntity> {
        return await this.restaurantChainRepository.save(chain);
    }
 
    async update(id: string, chain: RestaurantChainEntity): Promise<RestaurantChainEntity> {
        const persistedSite: RestaurantChainEntity = await this.restaurantChainRepository.findOne({
            where:{id}
        });
        if (!persistedSite)
          throw new BusinessLogicException(
            "The restaurant chain with the given id was not found",
            BusinessError.NOT_FOUND
          );
       
        chain.id = id; 
       
        return await this.restaurantChainRepository.save(chain);
    }
 
    async delete(id: string) {
        const chain: RestaurantChainEntity = await this.restaurantChainRepository.findOne({
            where:{id}
        });
        if (!chain)
          throw new BusinessLogicException(
            "The restaurant chain with the given id was not found",
            BusinessError.NOT_FOUND
          );
     
        await this.restaurantChainRepository.remove(chain);
    }
}
