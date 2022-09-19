import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PlateEntity } from './plate.entity';
import { PlateService } from './plate.service';
import { faker } from '@faker-js/faker';
import { CategoryEntity } from 'src/category/category.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { ImageEntity } from 'src/image/image.entity';
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';

describe('PlateService', () => {
  let service: PlateService;
  let repository: Repository<PlateEntity>;
  const platesList = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlateService],
    }).compile();

    service = module.get<PlateService>(PlateService);
    repository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for(let i = 0; i < 5; i++){
        const plate: PlateEntity = await repository.save({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        description: faker.lorem.sentence(),
        value: faker.datatype.number(),
        notes: faker.lorem.sentence()})

        platesList.push(plate);
      }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all plates', async () => {
    const plates: PlateEntity[] = await service.findAll();
    expect(plates).not.toBeNull();
    expect(plates).toHaveLength(platesList.length);
  });

  it('findOne should return a plate by id', async () => {
    const storedPlate: PlateEntity = platesList[0];
    const plate: PlateEntity = await service.findOne(storedPlate.id);
    expect(plate).not.toBeNull();
    expect(plate.name).toEqual(storedPlate.name)
  });
  
  it('findOne should throw an exception for an invalid plate', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The plate with the given id was not found")
  });

  it('create should return a new plate', async () => {
    const plate: PlateEntity = {
      id: "",
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: 0,
      notes: "",
      descriptionTags: [],
      promotion: new PromotionEntity,
      images: new ImageEntity,
      orderDetail: new OrderDetailEntity,
      category: new CategoryEntity 
    }
 
    const newPlate: PlateEntity = await service.create(plate);
    expect(newPlate).not.toBeNull();
 
    const storedPlate: PlateEntity = await repository.findOne({where: {id: newPlate.id}})
    expect(storedPlate).not.toBeNull();
    expect(storedPlate.name).toEqual(newPlate.name)
  });

  it('update should modify a plate', async () => {
    const plate: PlateEntity = platesList[0];
    plate.name = "New name";
    plate.description = "New description";
     const updatedPlate: PlateEntity = await service.update(plate.id, plate);
    expect(updatedPlate).not.toBeNull();
     const storedMuseum: PlateEntity = await repository.findOne({ where: { id: plate.id } })
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.name).toEqual(plate.name)
    expect(storedMuseum.description).toEqual(plate.description)
  });

  it('delete should remove a plate', async () => {
    const plate: PlateEntity = platesList[0];
    await service.delete(plate.id);
     const deletedPlate: PlateEntity = await repository.findOne({ where: { id: plate.id } })
    expect(deletedPlate).toBeNull();
  });
});

