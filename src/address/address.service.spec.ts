import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AddressEntity } from './address.entity';
import { AddressService } from './address.service';

import { faker } from '@faker-js/faker';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<AddressEntity>;
  let addresssList: AddressEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AddressService],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<AddressEntity>>(getRepositoryToken(AddressEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    addresssList = [];
    for(let i = 0; i < 5; i++){
        const address: AddressEntity = await repository.save({
          location: faker.company.name(), 
          city: faker.lorem.sentence(), 
          neighborhood: faker.address.cityName(), 
          direction: faker.address.secondaryAddress()})
        addresssList.push(address);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all addresss', async () => {
    const addresss: AddressEntity[] = await service.findAll();
    expect(addresss).not.toBeNull();
    expect(addresss).toHaveLength(addresssList.length);
  });

  it('findOne should return a address by id', async () => {
    const storedAddress: AddressEntity = addresssList[0];
    const address: AddressEntity = await service.findOne(storedAddress.id);
    expect(address).not.toBeNull();
    expect(address.location).toEqual(storedAddress.location)
    expect(address.city).toEqual(storedAddress.city)
    expect(address.neighborhood).toEqual(storedAddress.neighborhood)
    expect(address.direction).toEqual(storedAddress.direction)
  });

  it('findOne should throw an exception for an invalid address', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The address with the given id was not found")
  });

  it('create should return a new address', async () => {
    const address: AddressEntity = {
      id: "",
      location: faker.company.name(), 
      city: faker.lorem.sentence(), 
      neighborhood: faker.address.cityName(), 
      direction: faker.address.secondaryAddress(),
      restaurantSite: null
    }

    const newAddress: AddressEntity = await service.create(address);
    expect(newAddress).not.toBeNull();

    const storedAddress: AddressEntity = await repository.findOne({where: {id: newAddress.id}})
    expect(storedAddress).not.toBeNull();
    expect(storedAddress.location).toEqual(newAddress.location)
    expect(storedAddress.city).toEqual(newAddress.city)
    expect(storedAddress.neighborhood).toEqual(newAddress.neighborhood)
    expect(storedAddress.direction).toEqual(newAddress.direction)
  });

  it('update should modify a address', async () => {
    const address: AddressEntity = addresssList[0];
    address.location = "New name";
    address.city = "New address";
  
    const updatedAddress: AddressEntity = await service.update(address.id, address);
    expect(updatedAddress).not.toBeNull();
  
    const storedAddress: AddressEntity = await repository.findOne({ where: { id: address.id } })
    expect(storedAddress).not.toBeNull();
    expect(storedAddress.location).toEqual(address.location)
    expect(storedAddress.city).toEqual(address.city)
  });
 
  it('update should throw an exception for an invalid address', async () => {
    let address: AddressEntity = addresssList[0];
    address = {
      ...address, location: "New name", city: "New address"
    }
    await expect(() => service.update("0", address)).rejects.toHaveProperty("message", "The address with the given id was not found")
  });

  it('delete should remove a address', async () => {
    const address: AddressEntity = addresssList[0];
    await service.delete(address.id);
  
    const deletedAddress: AddressEntity = await repository.findOne({ where: { id: address.id } })
    expect(deletedAddress).toBeNull();
  });

  it('delete should throw an exception for an invalid address', async () => {
    const address: AddressEntity = addresssList[0];
    await service.delete(address.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The address with the given id was not found")
  });
 
});