import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SitePromotionService } from './site-promotion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { PromotionEntity } from '../promotion/promotion.entity';


describe('SitePromotionService', () => {
  let service: SitePromotionService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let promotionRepository: Repository<PromotionEntity>;
  let site: RestaurantSiteEntity;
  let promotionsList : PromotionEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SitePromotionService],
    }).compile();

    service = module.get<SitePromotionService>(SitePromotionService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    promotionRepository = module.get<Repository<PromotionEntity>>(getRepositoryToken(PromotionEntity));

    //await seedDatabase();
  });

  /*
  const seedDatabase = async () => {
    promotionRepository.clear();
    siteRepository.clear();

    promotionsList = [];
    for(let i = 0; i < 5; i++){
        const promotion: PromotionEntity = await promotionRepository.save({
          startDate: faker.date.recent(),
          endDate: faker.date.recent(),
          discount: faker.datatype.number(2),
          description: faker.lorem.sentence(),
        })
        promotionsList.push(promotion);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      promotions: promotionsList 
    })
  }
  */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*
  it('addPromotionSite should add an promotion to a site', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(2),
      description: faker.lorem.sentence(),
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addPromotionSite(newSite.id, newPromotion.id);
    
    expect(result.promotions.length).toBe(1);
    expect(result.promotions[0]).not.toBeNull();
    expect(result.promotions[0].startDate).toStrictEqual(newPromotion.startDate)
    expect(result.promotions[0].endDate).toStrictEqual(newPromotion.endDate)
    expect(result.promotions[0].discount).toBe(newPromotion.discount)
    expect(result.promotions[0].description).toBe(newPromotion.description)
  });

  it('addPromotionSite should thrown exception for an invalid promotion', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addPromotionSite(newSite.id, "0")).rejects.toHaveProperty("message", "The promotion with the given id was not found");
  });

  it('addPromotionSite should throw an exception for an invalid site', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(2),
      description: faker.lorem.sentence(),
    });

    await expect(() => service.addPromotionSite("0", newPromotion.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findPromotionBySiteIdPromotionId should return promotion by site', async () => {
    const promotion: PromotionEntity = promotionsList[0];
    const storedOperator: PromotionEntity = await service.findPromotionBySiteIdPromotionId(site.id, promotion.id, )
    expect(storedOperator).not.toBeNull();
    expect(storedOperator.startDate).toStrictEqual(promotion.startDate);
    expect(storedOperator.endDate).toStrictEqual(promotion.endDate);
    expect(storedOperator.discount).toBe(promotion.discount);
    expect(storedOperator.description).toBe(promotion.description);
  });

  it('findPromotionBySiteIdPromotionId should throw an exception for an invalid promotion', async () => {
    await expect(()=> service.findPromotionBySiteIdPromotionId(site.id, "0")).rejects.toHaveProperty("message", "The promotion with the given id was not found"); 
  });

  it('findPromotionBySiteIdPromotionId should throw an exception for an invalid site', async () => {
    const promotion: PromotionEntity = promotionsList[0]; 
    await expect(()=> service.findPromotionBySiteIdPromotionId("0", promotion.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findPromotionBySiteIdPromotionId should throw an exception for an promotion not associated to the site', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(2),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.findPromotionBySiteIdPromotionId(site.id, newPromotion.id)).rejects.toHaveProperty("message", "The promotion with the given id is not associated to the site"); 
  });

  it('findPromotionsBySiteId should return promotions by site', async ()=>{
    const promotions: PromotionEntity[] = await service.findPromotionsBySiteId(site.id);
    expect(promotions.length).toBe(5)
  });

  it('findPromotionsBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findPromotionsBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associatePromotionsSite should update promotions list for a site', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.date.recent(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(2),
      description: faker.lorem.sentence(),
    });

    const updatedSite: RestaurantSiteEntity = await service.associatePromotionsSite(site.id, [newPromotion]);
    expect(updatedSite.promotions.length).toBe(1);

    expect(updatedSite.promotions[0].startDate).toStrictEqual(newPromotion.startDate);
    expect(updatedSite.promotions[0].endDate).toStrictEqual(newPromotion.endDate);
    expect(updatedSite.promotions[0].discount).toBe(newPromotion.discount);
    expect(updatedSite.promotions[0].description).toBe(newPromotion.description);
  });

  it('associatePromotionsSite should throw an exception for an invalid site', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.random.word(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(100000),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.associatePromotionsSite("0", [newPromotion])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associatePromotionsSite should throw an exception for an invalid promotion', async () => {
    const newPromotion: PromotionEntity = promotionsList[0];
    newPromotion.id = "0";

    await expect(()=> service.associatePromotionsSite(site.id, [newPromotion])).rejects.toHaveProperty("message", "The promotion with the given id was not found"); 
  });

  it('deletePromotionSite should remove an promotion from a site', async () => {
    const promotion: PromotionEntity = promotionsList[0];
    
    await service.deletePromotionSite(site.id, promotion.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["promotions"]});
    const deletedOrder: PromotionEntity = storedSite.promotions.find(a => a.id === promotion.id);

    expect(deletedOrder).toBeUndefined();

  });

  it('deletePromotionSite should thrown an exception for an invalid promotion', async () => {
    await expect(()=> service.deletePromotionSite(site.id, "0")).rejects.toHaveProperty("message", "The promotion with the given id was not found"); 
  });

  it('deletePromotionSite should thrown an exception for an invalid site', async () => {
    const promotion: PromotionEntity = promotionsList[0];
    await expect(()=> service.deletePromotionSite("0", promotion.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deletePromotionSite should thrown an exception for an non asocciated promotion', async () => {
    const newPromotion: PromotionEntity = await promotionRepository.save({
      startDate: faker.random.word(),
      endDate: faker.date.recent(),
      discount: faker.datatype.number(100000),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.deletePromotionSite(site.id, newPromotion.id)).rejects.toHaveProperty("message", "The promotion with the given id is not associated to the site"); 
  });
  */
});
