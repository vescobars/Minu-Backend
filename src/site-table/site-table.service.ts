import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
import { TableEntity } from '../table/table.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SiteTableService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(TableEntity)
        private readonly tableEntity: Repository<TableEntity>
    ) {}

    async addTableSite(siteId: string, tableId: string): Promise<RestaurantSiteEntity> {
        const table: TableEntity = await this.tableEntity.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","tables","reviews","operators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.tables = [...site.tables, table];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findTableBySiteIdTableId(siteId: string, tableId: string): Promise<TableEntity> {
        const table: TableEntity = await this.tableEntity.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["tables"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteTable: TableEntity = site.tables.find(e => e.id === table.id);
    
        if (!siteTable)
          throw new BusinessLogicException("The table with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteTable;
    }
     
    async findTablesBySiteId(siteId: string): Promise<TableEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["tables"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.tables;
    }
     
    async associateTablesSite(siteId: string, tables: TableEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["tables"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < tables.length; i++) {
          const table: TableEntity = await this.tableEntity.findOne({where: {id: tables[i].id}});
          if (!table)
            throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.tables = tables;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteTableSite(siteId: string, tableId: string){
        const table: TableEntity = await this.tableEntity.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["tables"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteTable: TableEntity = site.tables.find(e => e.id === table.id);
     
        if (!siteTable)
            throw new BusinessLogicException("The table with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.tables = site.tables.filter(e => e.id !== tableId);
        await this.restaurantSiteRepository.save(site);
    } 
}
