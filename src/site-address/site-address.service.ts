import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from '../address/address.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class SiteAddressService {
    constructor(
        @InjectRepository(RestaurantSiteEntity)
        private readonly siteRepository: Repository<RestaurantSiteEntity>,
    
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
      ) {}
    
      async addAddressSite(siteId: string, addressId: string): Promise<RestaurantSiteEntity> {
        const address: AddressEntity = await this.addressRepository.findOne({where: { id: addressId }});
        if (!address)
          throw new BusinessLogicException('The address with the given id was not found', BusinessError.NOT_FOUND);
    
        const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId },relations: ["orders","tables","reviews","restaurantOperators","schedules","promotions","menu","address"]});
        if (!site)
          throw new BusinessLogicException('The site with the given id was not found',BusinessError.NOT_FOUND);
    
        site.address = address;
        return await this.siteRepository.save(site);
      }
    
      async findAddressBySiteId(siteId: string): Promise<AddressEntity> {
        const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['address']});
        if (!site)
          throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);
    
        return site.address;
      }
    
      async associateAddressSite(siteId: string, address: AddressEntity): Promise<RestaurantSiteEntity> {
        const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['address']});
        if (!site)
          throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);
    
        const addressEntity: AddressEntity = await this.addressRepository.findOne({where: { id: address.id }});
        if (!addressEntity)
          throw new BusinessLogicException('The address with the given id was not found', BusinessError.NOT_FOUND);
    
        site.address = addressEntity;
        return await this.siteRepository.save(site);
      }
    
      async deleteAddressSite(siteId: string, addressId: string) {
        const address: AddressEntity = await this.addressRepository.findOne({where: { id: addressId }});
        if (!address)
          throw new BusinessLogicException('The address with the given id was not found', BusinessError.NOT_FOUND);
    
        const site: RestaurantSiteEntity = await this.siteRepository.findOne({where: { id: siteId }, relations: ['address']});
        if (!site)
          throw new BusinessLogicException('The site with the given id was not found', BusinessError.NOT_FOUND);
    
        if (site.address.id !== address.id)
          throw new BusinessLogicException('The address with the given id is not associated to the site', BusinessError.PRECONDITION_FAILED);
    
        site.address = null;
        await this.siteRepository.save(site);
      }
}
