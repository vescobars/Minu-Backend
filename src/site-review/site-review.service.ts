import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ReviewEntity } from '../review/review.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteReviewService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(ReviewEntity)
        private readonly reviewEntity: Repository<ReviewEntity>
    ) {}

    async addReviewSite(siteId: string, reviewId: string): Promise<RestaurantSiteEntity> {
        const review: ReviewEntity = await this.reviewEntity.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","tables","reviews","operators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.reviews = [...site.reviews, review];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findReviewBySiteIdReviewId(siteId: string, reviewId: string): Promise<ReviewEntity> {
        const review: ReviewEntity = await this.reviewEntity.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["reviews"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteTable: ReviewEntity = site.reviews.find(e => e.id === review.id);
    
        if (!siteTable)
          throw new BusinessLogicException("The review with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteTable;
    }
     
    async findReviewsBySiteId(siteId: string): Promise<ReviewEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["reviews"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.reviews;
    }
     
    async associateReviewsSite(siteId: string, reviews: ReviewEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["reviews"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < reviews.length; i++) {
          const review: ReviewEntity = await this.reviewEntity.findOne({where: {id: reviews[i].id}});
          if (!review)
            throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.reviews = reviews;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteReviewSite(siteId: string, reviewId: string){
        const review: ReviewEntity = await this.reviewEntity.findOne({where: {id: reviewId}});
        if (!review)
          throw new BusinessLogicException("The review with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["reviews"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteTable: ReviewEntity = site.reviews.find(e => e.id === review.id);
     
        if (!siteTable)
            throw new BusinessLogicException("The review with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.reviews = site.reviews.filter(e => e.id !== reviewId);
        await this.restaurantSiteRepository.save(site);
    }
}
