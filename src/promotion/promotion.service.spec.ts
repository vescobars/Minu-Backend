import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PromotionEntity } from './promotion.entity';
import { PromotionService } from './promotion.service';
import { faker } from '@faker-js/faker';
import { PlateEntity } from '../plate/plate.entity';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';

describe('PromotionService', () => {
  let service: PromotionService;
  let repository: Repository<PromotionEntity>;
  const promotionsList = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PromotionService],
    }).compile();

    service = module.get<PromotionService>(PromotionService);
    repository = module.get<Repository<PromotionEntity>>(getRepositoryToken(PromotionEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    
    for(let i = 0; i < 5; i++){
        const promotion: PromotionEntity = await repository.save({
          id: faker.datatype.uuid(),
          startDate: faker.datatype.string(),
          endDate: faker.datatype.string(),
          discount: faker.datatype.number(),
          description: faker.lorem.sentence()
        })
        promotionsList.push(promotion);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all promotions', async () => {
    const promotions: PromotionEntity[] = await service.findAll();
    expect(promotions).not.toBeNull();
    expect(promotions).toHaveLength(promotionsList.length);
  });

  it('findOne should return a promotion by id', async () => {
    const storedPromotion: PromotionEntity = promotionsList[0];
    const promotion: PromotionEntity = await service.findOne(storedPromotion.id);
    expect(promotion).not.toBeNull();
    expect(promotion.id).toEqual(storedPromotion.id)
    expect(promotion.description).toEqual(storedPromotion.description)
  });

  it('create should return a new promotion', async () => {
    const promotion: PromotionEntity = {
      id: "",
      startDate: faker.datatype.string(),
      endDate: faker.datatype.string(),
      discount: faker.datatype.number(),
      description: faker.lorem.sentence(),
      plate: new PlateEntity(),
      restaurantSite: new RestaurantSiteEntity()
    }
 
    const newPromotion: PromotionEntity = await service.create(promotion);
    expect(newPromotion).not.toBeNull();
 
    const storedPromotion: PromotionEntity = await repository.findOne({where: {id: newPromotion.id}})
    expect(storedPromotion).not.toBeNull();
    expect(storedPromotion.id).toEqual(newPromotion.id)
    expect(storedPromotion.description).toEqual(newPromotion.description)
  });

  it('update should modify a promotion', async () => {
    const promotion: PromotionEntity = promotionsList[0];
    promotion.description = "New description";
     const updatedPromotion: PromotionEntity = await service.update(promotion.id, promotion);
    expect(updatedPromotion).not.toBeNull();
     const storedPromotion: PromotionEntity = await repository.findOne({ where: { id: promotion.id } })
    expect(storedPromotion).not.toBeNull();
    expect(storedPromotion.description).toEqual(promotion.description)
  });

  it('delete should remove a promotion', async () => {
    const promotion: PromotionEntity = promotionsList[0];
    await service.delete(promotion.id);
     const deletedPromotion: PromotionEntity = await repository.findOne({ where: { id: promotion.id } })
    expect(deletedPromotion).toBeNull();
  });
});
