import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';

@Injectable()
export class RestaurantSiteService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>
    ){}

    async findAll(): Promise<RestaurantSiteEntity[]> {
        return await this.restaurantSiteRepository.find({
            relations: ["orders", "tables", "reviews", "operators","schedules", "promotions", "menu", "address"] 
        });
    }

    async findOne(id: string): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({
            where: {id}, 
            relations: ["orders", "tables", "reviews", "operators","schedules", "promotions", "menu", "address"] 
        });
        if (!site)
          throw new BusinessLogicException(
            "The restaurant site with the given id was not found", 
            BusinessError.NOT_FOUND
          );
   
        return site;
    }

    async create(site: RestaurantSiteEntity): Promise<RestaurantSiteEntity> {
        return await this.restaurantSiteRepository.save(site);
    }
 
    async update(id: string, site: RestaurantSiteEntity): Promise<RestaurantSiteEntity> {
        const persistedSite: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({
            where:{id}
        });
        if (!persistedSite)
          throw new BusinessLogicException(
            "The restaurant site with the given id was not found",
            BusinessError.NOT_FOUND
          );
       
        site.id = id; 
       
        return await this.restaurantSiteRepository.save(site);
    }
 
    async delete(id: string) {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({
            where:{id}
        });
        if (!site)
          throw new BusinessLogicException(
            "The restaurant site with the given id was not found",
            BusinessError.NOT_FOUND
          );
     
        await this.restaurantSiteRepository.remove(site);
    }
}
