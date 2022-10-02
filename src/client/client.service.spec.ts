/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<ClientEntity>;
  let clientsList: ClientEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    clientsList = [];
    for (let i = 0; i < 5; i++) {
      const client: ClientEntity = await repository.save({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        imageUrl: faker.internet.url(),
        orders: [],
        reviews: [],
      });
      clientsList.push(client);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all clients', async () => {
    const clients: ClientEntity[] = await service.findAll();
    expect(clients).not.toBeNull();
    expect(clients).toHaveLength(clientsList.length);
  });

  it('findOne should return a client by id', async () => {
    const storedClient: ClientEntity = clientsList[0];
    const client: ClientEntity = await service.findOne(storedClient.id);
    expect(client).not.toBeNull();
    expect(client.firstName).toEqual(storedClient.firstName);
    expect(client.lastName).toEqual(storedClient.lastName);
    expect(client.phone).toEqual(storedClient.phone);
    expect(client.email).toEqual(storedClient.email);
    expect(client.imageUrl).toEqual(storedClient.imageUrl);
  });

  it('findOne should throw an exception for an invalid client', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('create should return a new client', async () => {
    const client: ClientEntity = {
      id: '',
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      orders: [],
      reviews: [],
    };

    const newClient: ClientEntity = await service.create(client);
    expect(newClient).not.toBeNull();

    const storedClient: ClientEntity = await repository.findOne({
      where: { id: newClient.id },
    });
    expect(storedClient).not.toBeNull();
    expect(storedClient.firstName).toEqual(newClient.firstName);
    expect(storedClient.lastName).toEqual(newClient.lastName);
    expect(storedClient.phone).toEqual(newClient.phone);
    expect(storedClient.email).toEqual(newClient.email);
    expect(storedClient.imageUrl).toEqual(newClient.imageUrl);
  });

  it('update should modify a client', async () => {
    const client: ClientEntity = clientsList[0];
    client.firstName = 'New name';
    client.lastName = 'New address';

    const updatedClient: ClientEntity = await service.update(client.id, client);
    expect(updatedClient).not.toBeNull();

    const storedClient: ClientEntity = await repository.findOne({
      where: { id: client.id },
    });
    expect(storedClient).not.toBeNull();
    expect(storedClient.firstName).toEqual(client.firstName);
    expect(storedClient.lastName).toEqual(client.lastName);
  });

  it('update should throw an exception for an invalid client', async () => {
    let client: ClientEntity = clientsList[0];
    client = {
      ...client,
      firstName: 'New name',
      lastName: 'New address',
    };
    await expect(() => service.update('0', client)).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('delete should remove a client', async () => {
    const client: ClientEntity = clientsList[0];
    await service.delete(client.id);

    const deletedClient: ClientEntity = await repository.findOne({
      where: { id: client.id },
    });
    expect(deletedClient).toBeNull();
  });

  it('delete should throw an exception for an invalid client', async () => {
    const client: ClientEntity = clientsList[0];
    await service.delete(client.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });
});
