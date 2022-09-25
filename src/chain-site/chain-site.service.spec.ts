import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ChainSiteService } from './chain-site.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantChainEntity } from '../restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';

describe('ChainSiteService', () => {
  let service: ChainSiteService;
  let chainRepository: Repository<RestaurantChainEntity>;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let chain: RestaurantChainEntity;
  let sitesList : RestaurantSiteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ChainSiteService],
    }).compile();

    service = module.get<ChainSiteService>(ChainSiteService);
    chainRepository = module.get<Repository<RestaurantChainEntity>>(getRepositoryToken(RestaurantChainEntity));
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    siteRepository.clear();
    chainRepository.clear();

    sitesList = [];
    for(let i = 0; i < 5; i++){
        const site: RestaurantSiteEntity = await siteRepository.save({
          description: faker.lorem.sentence()
        })
        sitesList.push(site);
    }

    chain = await chainRepository.save({
      chainName: faker.company.name(), 
      restaurantSites: sitesList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSiteChain should add an site to a chain', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    const newChain: RestaurantChainEntity = await chainRepository.save({
      chainName: faker.company.name(), 
    })

    const result: RestaurantChainEntity = await service.addSiteChain(newChain.id, newSite.id);
    
    expect(result.restaurantSites.length).toBe(1);
    expect(result.restaurantSites[0]).not.toBeNull();
    expect(result.restaurantSites[0].description).toBe(newSite.description)
  });

  it('addSiteChain should thrown exception for an invalid site', async () => {
    const newChain: RestaurantChainEntity = await chainRepository.save({
      chainName: faker.company.name(), 
    })

    await expect(() => service.addSiteChain(newChain.id, "0")).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('addSiteChain should throw an exception for an invalid chain', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    await expect(() => service.addSiteChain("0", newSite.id)).rejects.toHaveProperty("message", "The chain with the given id was not found");
  });

  it('findSiteByChainIdSiteId should return site by chain', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    const storedSite: RestaurantSiteEntity = await service.findSiteByChainIdSiteId(chain.id, site.id, )
    expect(storedSite).not.toBeNull();
    expect(storedSite.description).toBe(site.description);
  });

  it('findSiteByChainIdSiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findSiteByChainIdSiteId(chain.id, "0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findSiteByChainIdSiteId should throw an exception for an invalid chain', async () => {
    const site: RestaurantSiteEntity = sitesList[0]; 
    await expect(()=> service.findSiteByChainIdSiteId("0", site.id)).rejects.toHaveProperty("message", "The chain with the given id was not found"); 
  });

  it('findSiteByChainIdSiteId should throw an exception for an site not associated to the chain', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.findSiteByChainIdSiteId(chain.id, newSite.id)).rejects.toHaveProperty("message", "The site with the given id is not associated to the chain"); 
  });

  it('findSitesByChainId should return restaurantSites by chain', async ()=>{
    const restaurantSites: RestaurantSiteEntity[] = await service.findSitesByChainId(chain.id);
    expect(restaurantSites.length).toBe(5)
  });

  it('findSitesByChainId should throw an exception for an invalid chain', async () => {
    await expect(()=> service.findSitesByChainId("0")).rejects.toHaveProperty("message", "The chain with the given id was not found"); 
  });

  it('associateSitesChain should update restaurantSites list for a chain', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    const updatedChain: RestaurantChainEntity = await service.associateSitesChain(chain.id, [newSite]);
    expect(updatedChain.restaurantSites.length).toBe(1);

    expect(updatedChain.restaurantSites[0].description).toBe(newSite.description);
  });

  it('associateSitesChain should throw an exception for an invalid chain', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.associateSitesChain("0", [newSite])).rejects.toHaveProperty("message", "The chain with the given id was not found"); 
  });

  it('associateSitesChain should throw an exception for an invalid site', async () => {
    const newSite: RestaurantSiteEntity = sitesList[0];
    newSite.id = "0";

    await expect(()=> service.associateSitesChain(chain.id, [newSite])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteSiteChain should remove an site from a chain', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    
    await service.deleteSiteChain(chain.id, site.id);

    const storedChain: RestaurantChainEntity = await chainRepository.findOne({where: {id: chain.id}, relations: ["restaurantSites"]});
    const deletedSite: RestaurantSiteEntity = storedChain.restaurantSites.find(a => a.id === site.id);

    expect(deletedSite).toBeUndefined();

  });

  it('deleteSiteChain should thrown an exception for an invalid site', async () => {
    await expect(()=> service.deleteSiteChain(chain.id, "0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteSiteChain should thrown an exception for an invalid chain', async () => {
    const site: RestaurantSiteEntity = sitesList[0];
    await expect(()=> service.deleteSiteChain("0", site.id)).rejects.toHaveProperty("message", "The chain with the given id was not found"); 
  });

  it('deleteSiteChain should thrown an exception for an non asocciated site', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.deleteSiteChain(chain.id, newSite.id)).rejects.toHaveProperty("message", "The site with the given id is not associated to the chain"); 
  }); 
});
