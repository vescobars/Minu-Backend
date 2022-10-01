import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RestaurantOperatorEntity } from './restaurant-operator.entity';
import { RestaurantOperatorService } from './restaurant-operator.service';

import { faker } from '@faker-js/faker';

describe('RestaurantOperatorService', () => {
  let service: RestaurantOperatorService;
  let repository: Repository<RestaurantOperatorEntity>;
  let restaurantOperatorsList: RestaurantOperatorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantOperatorService],
    }).compile();

    service = module.get<RestaurantOperatorService>(RestaurantOperatorService);
    repository = module.get<Repository<RestaurantOperatorEntity>>(getRepositoryToken(RestaurantOperatorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    restaurantOperatorsList = [];
    for(let i = 0; i < 5; i++){
        const restaurantOperator: RestaurantOperatorEntity = await repository.save({
        firstname: faker.company.name(), 
        cellphone: faker.company.name(), 
        lastname: faker.company.name(), 
        email: faker.company.name(), 
        role: faker.company.name(),
        active: faker.datatype.boolean(),
        imageUrl : faker.company.name()})
        restaurantOperatorsList.push(restaurantOperator);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all restaurantOperators', async () => {
    const restaurantOperators: RestaurantOperatorEntity[] = await service.findAll();
    expect(restaurantOperators).not.toBeNull();
    expect(restaurantOperators).toHaveLength(restaurantOperatorsList.length);
  });

  it('findOne should return a restaurantOperator by id', async () => {
    const storedRestaurantOperator: RestaurantOperatorEntity = restaurantOperatorsList[0];
    const restaurantOperator: RestaurantOperatorEntity = await service.findOne(storedRestaurantOperator.id);
    expect(restaurantOperator).not.toBeNull();
    expect(restaurantOperator.firstname).toEqual(storedRestaurantOperator.firstname)
    expect(restaurantOperator.cellphone).toEqual(storedRestaurantOperator.cellphone)
    expect(restaurantOperator.lastname).toEqual(storedRestaurantOperator.lastname)
    expect(restaurantOperator.email).toEqual(storedRestaurantOperator.email)
    expect(restaurantOperator.role).toEqual(storedRestaurantOperator.role)
    expect(restaurantOperator.active).toEqual(storedRestaurantOperator.active)
  });

  it('findOne should throw an exception for an invalid restaurantOperator', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The restaurantOperator with the given id was not found")
  });

  it('create should return a new restaurantOperator', async () => {
    const restaurantOperator: RestaurantOperatorEntity = {
      id: "",
      firstname: faker.company.name(), 
        cellphone: faker.company.name(), 
        lastname: faker.company.name(), 
        email: faker.company.name(), 
        role: faker.company.name(),
        active: faker.datatype.boolean(),
        imageUrl : faker.company.name(),
        profileImage: null,
        restaurantSite: null
    }

    const newRestaurantOperator: RestaurantOperatorEntity = await service.create(restaurantOperator);
    expect(newRestaurantOperator).not.toBeNull();

    const storedRestaurantOperator: RestaurantOperatorEntity = await repository.findOne({where: {id: newRestaurantOperator.id}})
    expect(storedRestaurantOperator).not.toBeNull();
    expect(storedRestaurantOperator.firstname).toEqual(newRestaurantOperator.firstname)
    expect(storedRestaurantOperator.cellphone).toEqual(newRestaurantOperator.cellphone)
    expect(storedRestaurantOperator.lastname).toEqual(newRestaurantOperator.lastname)
  });

  it('update should modify a restaurantOperator', async () => {
    const restaurantOperator: RestaurantOperatorEntity = restaurantOperatorsList[0];
    restaurantOperator.firstname = "New name";
    restaurantOperator.cellphone = "New address";
  
    const updatedRestaurantOperator: RestaurantOperatorEntity = await service.update(restaurantOperator.id, restaurantOperator);
    expect(updatedRestaurantOperator).not.toBeNull();
  
    const storedRestaurantOperator: RestaurantOperatorEntity = await repository.findOne({ where: { id: restaurantOperator.id } })
    expect(storedRestaurantOperator).not.toBeNull();
    expect(storedRestaurantOperator.firstname).toEqual(restaurantOperator.firstname)
    expect(storedRestaurantOperator.cellphone).toEqual(restaurantOperator.cellphone)
  });
 
  it('update should throw an exception for an invalid restaurantOperator', async () => {
    let restaurantOperator: RestaurantOperatorEntity = restaurantOperatorsList[0];
    restaurantOperator = {
      ...restaurantOperator, firstname: "New name", cellphone: "New address"
    }
    await expect(() => service.update("0", restaurantOperator)).rejects.toHaveProperty("message", "The restaurantOperator with the given id was not found")
  });

  it('delete should remove a restaurantOperator', async () => {
    const restaurantOperator: RestaurantOperatorEntity = restaurantOperatorsList[0];
    await service.delete(restaurantOperator.id);
  
    const deletedRestaurantOperator: RestaurantOperatorEntity = await repository.findOne({ where: { id: restaurantOperator.id } })
    expect(deletedRestaurantOperator).toBeNull();
  });

  it('delete should throw an exception for an invalid restaurantOperator', async () => {
    const restaurantOperator: RestaurantOperatorEntity = restaurantOperatorsList[0];
    await service.delete(restaurantOperator.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The restaurantOperator with the given id was not found")
  });
 
});