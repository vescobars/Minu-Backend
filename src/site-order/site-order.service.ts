import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteOrderService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly restaurantSiteRepository: Repository<RestaurantSiteEntity>,
     
        @InjectRepository(OrderEntity)
        private readonly orderEntity: Repository<OrderEntity>
    ) {}

    async addOrderSite(siteId: string, orderId: string): Promise<RestaurantSiteEntity> {
        const order: OrderEntity = await this.orderEntity.findOne({where: {id: orderId}});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
       
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders","plates","reviews","operators","schedules","promotions","menu","address"]}) 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND);
     
        site.orders = [...site.orders, order];
        return await this.restaurantSiteRepository.save(site);
      }
     
    async findOrderBySiteIdOrderId(siteId: string, orderId: string): Promise<OrderEntity> {
        const order: OrderEntity = await this.orderEntity.findOne({where: {id: orderId}});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
        
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders"]}); 
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
    
        const siteOrder: OrderEntity = site.orders.find(e => e.id === order.id);
    
        if (!siteOrder)
          throw new BusinessLogicException("The order with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)
    
        return siteOrder;
    }
     
    async findOrdersBySiteId(siteId: string): Promise<OrderEntity[]> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
        
        return site.orders;
    }
     
    async associateOrdersSite(siteId: string, orders: OrderEntity[]): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders"]});
     
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        for (let i = 0; i < orders.length; i++) {
          const order: OrderEntity = await this.orderEntity.findOne({where: {id: orders[i].id}});
          if (!order)
            throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
        }
     
        site.orders = orders;
        return await this.restaurantSiteRepository.save(site);
      }
    
    async deleteOrderSite(siteId: string, orderId: string){
        const order: OrderEntity = await this.orderEntity.findOne({where: {id: orderId}});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
     
        const site: RestaurantSiteEntity = await this.restaurantSiteRepository.findOne({where: {id: siteId}, relations: ["orders"]});
        if (!site)
          throw new BusinessLogicException("The site with the given id was not found", BusinessError.NOT_FOUND)
     
        const siteOrder: OrderEntity = site.orders.find(e => e.id === order.id);
     
        if (!siteOrder)
            throw new BusinessLogicException("The order with the given id is not associated to the site", BusinessError.PRECONDITION_FAILED)

        site.orders = site.orders.filter(e => e.id !== orderId);
        await this.restaurantSiteRepository.save(site);
    }
}
