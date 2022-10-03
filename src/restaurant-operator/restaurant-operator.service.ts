import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RestaurantOperatorEntity } from './restaurant-operator.entity';

@Injectable()
export class RestaurantOperatorService {
    constructor(
        @InjectRepository(RestaurantOperatorEntity)
        private readonly restaurantOperatorRepository: Repository<RestaurantOperatorEntity>
    ){}

    async findAll(): Promise<RestaurantOperatorEntity[]> {
        return await this.restaurantOperatorRepository.find({ relations: [] });
    }

    async findOne(id: string): Promise<RestaurantOperatorEntity> {
        const restaurantOperator: RestaurantOperatorEntity = await this.restaurantOperatorRepository.findOne({where: {id}, relations: [] } );
        if (!restaurantOperator)
          throw new BusinessLogicException("The restaurantOperator with the given id was not found", BusinessError.NOT_FOUND);
    
        return restaurantOperator;
    }
    
    async create(restaurantOperator: RestaurantOperatorEntity): Promise<RestaurantOperatorEntity> {
        return await this.restaurantOperatorRepository.save(restaurantOperator);
    }

    async update(id: string, restaurantOperator: RestaurantOperatorEntity): Promise<RestaurantOperatorEntity> {
        const persistedRestaurantOperator: RestaurantOperatorEntity = await this.restaurantOperatorRepository.findOne({where:{id}});
        if (!persistedRestaurantOperator)
          throw new BusinessLogicException("The restaurantOperator with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.restaurantOperatorRepository.save({...persistedRestaurantOperator, ...restaurantOperator});
    }

    async delete(id: string) {
        const restaurantOperator: RestaurantOperatorEntity = await this.restaurantOperatorRepository.findOne({where:{id}});
        if (!restaurantOperator)
          throw new BusinessLogicException("The restaurantOperator with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.restaurantOperatorRepository.remove(restaurantOperator);
    }
}
