import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find({
      relations: ['orders', 'reviews'],
    });
  }

  async findOne(id: string): Promise<ClientEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id },
      relations: ['orders', 'reviews'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return client;
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    return await this.clientRepository.save(client);
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity> {
    const persistedClient: ClientEntity = await this.clientRepository.findOne({
      where: { id },
    });
    if (!persistedClient)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.id = id;

    return await this.clientRepository.save(client);
  }

  async delete(id: string) {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id },
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.clientRepository.remove(client);
  }
}
