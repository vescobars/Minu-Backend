import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';

import { faker } from '@faker-js/faker';

describe('RestaurantChainService', () => {
  let service: RestaurantChainService;
  let repository: Repository<RestaurantChainEntity>;
  let chainsList: RestaurantChainEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantChainService],
    }).compile();
 
    service = module.get<RestaurantChainService>(RestaurantChainService);
    repository = module.get<Repository<RestaurantChainEntity>>(getRepositoryToken(RestaurantChainEntity),);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    chainsList = [];
    for(let i = 0; i < 5; i++){
        const chain: RestaurantChainEntity = await repository.save({
        chainName: faker.company.name()})
        chainsList.push(chain);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all chains', async () => {
    const chains: RestaurantChainEntity[] = await service.findAll();
    expect(chains).not.toBeNull();
    expect(chains).toHaveLength(chainsList.length);
  });

  it('findOne should return a chain by id', async () => {
    const storedChain: RestaurantChainEntity = chainsList[0];
    const chain: RestaurantChainEntity = await service.findOne(storedChain.id);
    expect(chain).not.toBeNull();
    expect(chain.chainName).toEqual(storedChain.chainName)
  });

  it('findOne should throw an exception for an invalid chain', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The restaurant chain with the given id was not found")
  });
  
  it('create should return a new chain', async () => {
    const chain: RestaurantChainEntity = {
      id: "",
      chainName: faker.company.name(),
      restaurantSites: []
    }

    const newChain: RestaurantChainEntity = await service.create(chain);
    expect(newChain).not.toBeNull();

    const storedChain: RestaurantChainEntity = await repository.findOne({where: {id: newChain.id}})
    expect(storedChain).not.toBeNull();
    expect(storedChain.chainName).toEqual(newChain.chainName)
  });

  it('update should modify a chain', async () => {
    const chain: RestaurantChainEntity = chainsList[0];
    chain.chainName = "New name";
  
    const updatedChain: RestaurantChainEntity = await service.update(chain.id, chain);
    expect(updatedChain).not.toBeNull();
  
    const storedChain: RestaurantChainEntity = await repository.findOne({ where: { id: chain.id } })
    expect(storedChain).not.toBeNull();
    expect(storedChain.chainName).toEqual(chain.chainName)
  });

  it('update should throw an exception for an invalid chain', async () => {
    let chain: RestaurantChainEntity = chainsList[0];
    chain = {
      ...chain, chainName: "New name"
    }
    await expect(() => service.update("0", chain)).rejects.toHaveProperty("message", "The restaurant chain with the given id was not found")
  });

  it('delete should remove a chain', async () => {
    const chain: RestaurantChainEntity = chainsList[0];
    await service.delete(chain.id);
  
    const deletedChain: RestaurantChainEntity = await repository.findOne({ where: { id: chain.id } })
    expect(deletedChain).toBeNull();
  });

  it('delete should throw an exception for an invalid chain', async () => {
    const chain: RestaurantChainEntity = chainsList[0];
    await service.delete(chain.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The restaurant chain with the given id was not found")
  });

 });