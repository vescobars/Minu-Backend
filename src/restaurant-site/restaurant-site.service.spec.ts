import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';
import { faker } from '@faker-js/faker';

describe('RestaurantSiteService', () => {
  let service: RestaurantSiteService;
  let repository: Repository<RestaurantSiteEntity>;
  let sitesList: RestaurantSiteEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantSiteService],
    }).compile();
 
    service = module.get<RestaurantSiteService>(RestaurantSiteService);
    repository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity),);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    sitesList = [];
    for(let i = 0; i < 5; i++){
        const site: RestaurantSiteEntity = await repository.save({
          description: faker.lorem.sentence()})
        sitesList.push(site);
    }
  }
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all sites', async () => {
    const sites: RestaurantSiteEntity[] = await service.findAll();
    expect(sites).not.toBeNull();
    expect(sites).toHaveLength(sitesList.length);
  });

  it('findOne should return a site by id', async () => {
    const storedsite: RestaurantSiteEntity = sitesList[0];
    const site: RestaurantSiteEntity = await service.findOne(storedsite.id);
    expect(site).not.toBeNull();
    expect(site.description).toEqual(storedsite.description)
  });

  it('findOne should throw an exception for an invalid site', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The restaurant site with the given id was not found")
  });

  it('create should return a new site', async () => {
    const site: RestaurantSiteEntity = {
      id: "",
      description: faker.lorem.sentence(),
      restaurantChain: null,
      orders: [],
      tables: [],
      reviews: [],
      restaurantOperators: [],
      schedules: [],
      promotions: [],
      menu: null,
      address: null,
    }

    const newsite: RestaurantSiteEntity = await service.create(site);
    expect(newsite).not.toBeNull();

    const storedsite: RestaurantSiteEntity = await repository.findOne({where: {id: newsite.id}})
    expect(storedsite).not.toBeNull();
    expect(storedsite.description).toEqual(newsite.description)
  });

  it('update should modify a site', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    site.description = "New description";
  
    const updatedsite: RestaurantSiteEntity = await service.update(site.id, site);
    expect(updatedsite).not.toBeNull();
  
    const storedsite: RestaurantSiteEntity = await repository.findOne({ where: { id: site.id } })
    expect(storedsite).not.toBeNull();
    expect(storedsite.description).toEqual(site.description)
  });
 
  it('update should throw an exception for an invalid site', async () => {
    let site: RestaurantSiteEntity = sitesList[0];
    site = {
      ...site, description: "New description"
    }
    await expect(() => service.update("0", site)).rejects.toHaveProperty("message", "The restaurant site with the given id was not found")
  });

  it('delete should remove a site', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    await service.delete(site.id);
  
    const deletedsite: RestaurantSiteEntity = await repository.findOne({ where: { id: site.id } })
    expect(deletedsite).toBeNull();
  });

  it('delete should throw an exception for an invalid site', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    await service.delete(site.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The restaurant site with the given id was not found")
  });

 });