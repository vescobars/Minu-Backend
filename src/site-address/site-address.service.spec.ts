import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { AddressEntity } from '../address/address.entity';
import { Repository } from 'typeorm';
import { SiteAddressService } from './site-address.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('SiteAddressService', () => {
  let service: SiteAddressService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let addressRepository: Repository<AddressEntity>;
  let site: RestaurantSiteEntity;
  let address : AddressEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteAddressService],
    }).compile();

    addressRepository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity)); 
    service = module.get<SiteAddressService>(SiteAddressService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    siteRepository.clear();
    addressRepository.clear();
 
    address = await addressRepository.save({
      location: faker.address.country(),
      city: faker.address.cityName(),
      neighborhood: faker.address.street(),
      direction: faker.address.streetAddress(),
    })

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      address: address,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addAddressSite should add an address to a site', async () => {
    const newAddress: AddressEntity = await addressRepository.save({
      location: faker.address.country(),
      city: faker.address.cityName(),
      neighborhood: faker.address.street(),
      direction: faker.address.streetAddress(),
    });
 
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence()
    })
 
    const result: RestaurantSiteEntity = await service.addAddressSite(newSite.id, newAddress.id);
   
    expect(result.address).not.toBeNull();
    expect(result.address.location).toEqual(newAddress.location);
    expect(result.address.city).toEqual(newAddress.city);
    expect(result.address.neighborhood).toEqual(newAddress.neighborhood);
    expect(result.address.direction).toEqual(newAddress.direction);
  });

  it('addAddressSite should thrown exception for an invalid address', async () => {
    const newAddress: AddressEntity = await addressRepository.save({
      location: faker.address.country(),
      city: faker.address.cityName(),
      neighborhood: faker.address.street(),
      direction: faker.address.streetAddress(),
    });
 
    await expect(() => service.addAddressSite(newAddress.id, "0")).rejects.toHaveProperty("message", "The address with the given id was not found");
  });

  it('addAddressSite should throw an exception for an invalid site', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence()
    })
 
    await expect(() => service.addAddressSite("0", newSite.id)).rejects.toHaveProperty("message", "The address with the given id was not found");
  });

  it('findAddressBySiteId should return address by site', async ()=>{
    const address: AddressEntity = await service.findAddressBySiteId(site.id);
    expect(address.location).toEqual(address.location);
    expect(address.city).toEqual(address.city);
    expect(address.neighborhood).toEqual(address.neighborhood);
    expect(address.direction).toEqual(address.direction);
  });

  it('findAddressBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findAddressBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('associateAddressSite should update address for a site', async () => {
    const newAddress: AddressEntity = await addressRepository.save({
      location: faker.address.country(),
      city: faker.address.cityName(),
      neighborhood: faker.address.street(),
      direction: faker.address.streetAddress(),
    });
 
    const updatedSite: RestaurantSiteEntity = await service.associateAddressSite(site.id, newAddress);
    
    expect(updatedSite.address.id).toEqual(newAddress.id);
    expect(updatedSite.address.location).toEqual(newAddress.location);
    expect(updatedSite.address.city).toEqual(newAddress.city);
    expect(updatedSite.address.neighborhood).toEqual(newAddress.neighborhood);
    expect(updatedSite.address.direction).toEqual(newAddress.direction);
  });

  it('associateAddressSite should throw an exception for an invalid site', async () => {
    const newAddress: AddressEntity = await addressRepository.save({
      location: faker.address.country(),
      city: faker.address.cityName(),
      neighborhood: faker.address.street(),
      direction: faker.address.streetAddress(),
    });
 
    await expect(()=> service.associateAddressSite("0", newAddress)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('associateAddressSite should throw an exception for an invalid address', async () => {
    const newAddress: AddressEntity = address;
    newAddress.id = "0";
 
    await expect(()=> service.associateAddressSite(site.id, newAddress)).rejects.toHaveProperty("message", "The address with the given id was not found");
  });

  it('deleteAddressSite should remove an address from a site', async () => {
    const addressE: AddressEntity = address;
   
    await service.deleteAddressSite(site.id, addressE.id);
 
    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations:  ["address"]});
    const deletedAddress: AddressEntity = storedSite.address;
 
    expect(deletedAddress).toBeNull();

  });
});
