import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { CoordinateEntity } from '../coordinate/coordinate.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ClientCoordinateService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(CoordinateEntity)
    private readonly coordinateRepository: Repository<CoordinateEntity>,
  ) {}

  async addCoordinateClient(
    clientId: string,
    coordinateId: string,
  ): Promise<ClientEntity> {
    const coordinate: CoordinateEntity =
      await this.coordinateRepository.findOne({
        where: { id: coordinateId },
      });
    if (!coordinate)
      throw new BusinessLogicException(
        'The coordinate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['currentLocation'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.currentLocation = coordinate;
    return await this.clientRepository.save(client);
  }

  async findCoordinateByClientId(clientId: string): Promise<CoordinateEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['currentLocation'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return client.currentLocation;
  }

  async associateCoordinateClient(
    clientId: string,
    coordinate: CoordinateEntity,
  ): Promise<ClientEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['currentLocation'],
    });

    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const coordinateEntity: CoordinateEntity =
      await this.coordinateRepository.findOne({
        where: { id: coordinate.id },
      });
    if (!coordinateEntity)
      throw new BusinessLogicException(
        'The coordinate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.currentLocation = coordinate;
    return await this.clientRepository.save(client);
  }

  async deleteCoordinateClient(clientId: string, coordinateId: string) {
    const coordinate: CoordinateEntity =
      await this.coordinateRepository.findOne({
        where: { id: coordinateId },
      });
    if (!coordinate)
      throw new BusinessLogicException(
        'The coordinate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['currentLocation'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (client.currentLocation.id !== coordinate.id)
      throw new BusinessLogicException(
        'The coordinate with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    client.currentLocation = null;
    await this.clientRepository.save(client);
  }
}
