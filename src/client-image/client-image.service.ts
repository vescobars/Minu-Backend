import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { ImageEntity } from '../image/image.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ClientImageService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
  ) {}

  async addImageClient(
    clientId: string,
    imageId: string,
  ): Promise<ClientEntity> {
    const image: ImageEntity = await this.imageRepository.findOne({
      where: { id: imageId },
    });
    if (!image)
      throw new BusinessLogicException(
        'The image with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['profileImage'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.profileImage = image;
    return await this.clientRepository.save(client);
  }

  async findImageByMuseumId(clientId: string): Promise<ImageEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['profileImage'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return client.profileImage;
  }

  async associateImageClient(
    clientId: string,
    image: ImageEntity,
  ): Promise<ClientEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['profileImage'],
    });

    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const imageEntity: ImageEntity = await this.imageRepository.findOne({
      where: { id: image.id },
    });
    if (!imageEntity)
      throw new BusinessLogicException(
        'The image with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.profileImage = image;
    return await this.clientRepository.save(client);
  }

  async deleteImageClient(clientId: string, imageId: string) {
    const image: ImageEntity = await this.imageRepository.findOne({
      where: { id: imageId },
    });
    if (!image)
      throw new BusinessLogicException(
        'The image with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['profileImage'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    if (client.profileImage.id !== image.id)
      throw new BusinessLogicException(
        'The image with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    client.profileImage = null;
    await this.clientRepository.save(client);
  }
}
