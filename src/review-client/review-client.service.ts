/* archivo: src/client-review/client-review.service.ts */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from '../client/client.entity';
import { ReviewEntity } from '../review/review.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ReviewClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async addReviewClient(
    clientId: string,
    reviewId: string,
  ): Promise<ClientEntity> {
    const review: ReviewEntity = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    if (!review)
      throw new BusinessLogicException(
        'The review with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['reviews'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    client.reviews = [...client.reviews, review];
    return await this.clientRepository.save(client);
  }

  async findReviewByClientIdReviewId(
    clientId: string,
    reviewId: string,
  ): Promise<ReviewEntity> {
    const review: ReviewEntity = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    if (!review)
      throw new BusinessLogicException(
        'The review with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['reviews'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clientReview: ReviewEntity = client.reviews.find(
      (e) => e.id === review.id,
    );

    if (!clientReview)
      throw new BusinessLogicException(
        'The review with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    return clientReview;
  }

  async findReviewsByClientId(clientId: string): Promise<ReviewEntity[]> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['reviews'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return client.reviews;
  }

  async associateReviewsClient(
    clientId: string,
    reviews: ReviewEntity[],
  ): Promise<ClientEntity> {
    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['reviews'],
    });

    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < reviews.length; i++) {
      const review: ReviewEntity = await this.reviewRepository.findOne({
        where: { id: reviews[i].id },
      });
      if (!review)
        throw new BusinessLogicException(
          'The review with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    client.reviews = reviews;
    return await this.clientRepository.save(client);
  }

  async deleteReviewClient(clientId: string, reviewId: string) {
    const review: ReviewEntity = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    if (!review)
      throw new BusinessLogicException(
        'The review with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const client: ClientEntity = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['reviews'],
    });
    if (!client)
      throw new BusinessLogicException(
        'The client with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const clientReview: ReviewEntity = client.reviews.find(
      (e) => e.id === review.id,
    );

    if (!clientReview)
      throw new BusinessLogicException(
        'The review with the given id is not associated to the client',
        BusinessError.PRECONDITION_FAILED,
      );

    client.reviews = client.reviews.filter((e) => e.id !== reviewId);
    await this.clientRepository.save(client);
  }
}
