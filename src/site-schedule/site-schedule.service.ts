import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteScheduleService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(ScheduleEntity)
        private readonly scheduleRepository: Repository<ScheduleEntity>
    ) {}

    async addScheduleSite(siteId: string, scheduleId: string): Promise<RestaurantSiteEntity> {
        const schedule: ScheduleEntity = await this.scheduleRepository.findOne({where: {id: scheduleId}});
        if (!schedule)
          throw new BusinessLogicException("The schedule with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","tables","reviews","operators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.schedules = [...site.schedules, schedule];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findScheduleBySiteIdScheduleId(siteId: string, scheduleId: string): Promise<ScheduleEntity> {
        const schedule: ScheduleEntity = await this.scheduleRepository.findOne({where: {id: scheduleId}});
        if (!schedule)
          throw new BusinessLogicException("The schedule with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["schedules"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteSchedule: ScheduleEntity = site.schedules.find(e => e.id === schedule.id);
    
        if (!siteSchedule)
          throw new BusinessLogicException("The schedule with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteSchedule;
    }
    
    async findSchedulesBySiteId(siteId: string): Promise<ScheduleEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["schedules"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.schedules;
    }
     
    async associateSchedulesSite(siteId: string, schedules: ScheduleEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["schedules"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < schedules.length; i++) {
          const schedule: ScheduleEntity = await this.scheduleRepository.findOne({where: {id: schedules[i].id}});
          if (!schedule)
            throw new BusinessLogicException("The schedule with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.schedules = schedules;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteScheduleSite(siteId: string, scheduleId: string){
        const schedule: ScheduleEntity = await this.scheduleRepository.findOne({where: {id: scheduleId}});
        if (!schedule)
          throw new BusinessLogicException("The schedule with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["schedules"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteSchedule: ScheduleEntity = site.schedules.find(e => e.id === schedule.id);
     
        if (!siteSchedule)
            throw new BusinessLogicException("The schedule with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.schedules = site.schedules.filter(e => e.id !== scheduleId);
        await this.restaurantSiteRepository.save(site);
    }
}
