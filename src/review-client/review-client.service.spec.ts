import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../client/client.entity';
import { ReviewEntity } from '../review/review.entity';
import { ReviewClientService } from './review-client.service';

describe('ReviewClientService', () => {
  let service: ReviewClientService;
  let clientRepository: Repository<ClientEntity>;
  let reviewRepository: Repository<ReviewEntity>;
  let client: ClientEntity;
  let reviewsList: ReviewEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReviewClientService],
    }).compile();

    service = module.get<ReviewClientService>(ReviewClientService);
    clientRepository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
    reviewRepository = module.get<Repository<ReviewEntity>>(
      getRepositoryToken(ReviewEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    reviewRepository.clear();
    clientRepository.clear();

    reviewsList = [];
    for (let i = 0; i < 5; i++) {
      const review: ReviewEntity = await reviewRepository.save({
        score: faker.datatype.number(),
        description: faker.lorem.sentence(),
      });
      reviewsList.push(review);
    }

    client = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      reviews: reviewsList,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReviewClient should add an review to a client', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    const newClient: ClientEntity = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      reviews: [],
    });

    const result: ClientEntity = await service.addReviewClient(
      newClient.id,
      newReview.id,
    );

    expect(result.reviews.length).toBe(1);
    expect(result.reviews[0].score).toEqual(newReview.score);
    expect(result.reviews[0].description).toEqual(newReview.description);
  });

  it('addReviewClient should thrown exception for an invalid review', async () => {
    const newClient: ClientEntity = await clientRepository.save({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      imageUrl: faker.internet.url(),
      reviews: [],
    });

    await expect(() =>
      service.addReviewClient(newClient.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id was not found',
    );
  });

  it('addReviewClient should throw an exception for an invalid client', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.addReviewClient('0', newReview.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('findReviewByClientIdReviewId should return review by client', async () => {
    const review: ReviewEntity = reviewsList[0];
    const storedReview: ReviewEntity =
      await service.findReviewByClientIdReviewId(client.id, review.id);
    expect(storedReview).not.toBeNull();
    expect(review.score).toBe(storedReview.score);
    expect(review.description).toEqual(storedReview.description);
  });

  it('findReviewByClientIdReviewId should throw an exception for an invalid review', async () => {
    await expect(() =>
      service.findReviewByClientIdReviewId(client.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id was not found',
    );
  });

  it('findReviewByClientIdReviewId should throw an exception for an invalid client', async () => {
    const review: ReviewEntity = reviewsList[0];
    await expect(() =>
      service.findReviewByClientIdReviewId('0', review.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('findReviewByClientIdReviewId should throw an exception for an review not associated to the client', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.findReviewByClientIdReviewId(client.id, newReview.id),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id is not associated to the client',
    );
  });

  it('findReviewsByClientId should return reviews by client', async () => {
    const reviews: ReviewEntity[] = await service.findReviewsByClientId(
      client.id,
    );
    expect(reviews.length).toBe(5);
  });

  it('findReviewsByClientId should throw an exception for an invalid client', async () => {
    await expect(() =>
      service.findReviewsByClientId('0'),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('associateReviewsClient should update reviews list for a client', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    const updatedClient: ClientEntity = await service.associateReviewsClient(
      client.id,
      [newReview],
    );
    expect(updatedClient.reviews.length).toBe(1);

    expect(updatedClient.reviews[0].score).toBe(newReview.score);
    expect(updatedClient.reviews[0].description).toBe(newReview.description);
  });

  it('associateReviewsClient should throw an exception for an invalid client', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.associateReviewsClient('0', [newReview]),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('associateReviewsClient should throw an exception for an invalid review', async () => {
    const newReview: ReviewEntity = reviewsList[0];
    newReview.id = '0';

    await expect(() =>
      service.associateReviewsClient(client.id, [newReview]),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id was not found',
    );
  });

  it('deleteReviewToClient should remove an review from a client', async () => {
    const review: ReviewEntity = reviewsList[0];

    await service.deleteReviewClient(client.id, review.id);

    const storedClient: ClientEntity = await clientRepository.findOne({
      where: { id: client.id },
      relations: ['reviews'],
    });
    const deletedReview: ReviewEntity = storedClient.reviews.find(
      (a) => a.id === review.id,
    );

    expect(deletedReview).toBeUndefined();
  });

  it('deleteReviewToClient should thrown an exception for an invalid review', async () => {
    await expect(() =>
      service.deleteReviewClient(client.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id was not found',
    );
  });

  it('deleteReviewToClient should thrown an exception for an invalid client', async () => {
    const review: ReviewEntity = reviewsList[0];
    await expect(() =>
      service.deleteReviewClient('0', review.id),
    ).rejects.toHaveProperty(
      'message',
      'The client with the given id was not found',
    );
  });

  it('deleteReviewToClient should thrown an exception for an non asocciated review', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
    });

    await expect(() =>
      service.deleteReviewClient(client.id, newReview.id),
    ).rejects.toHaveProperty(
      'message',
      'The review with the given id is not associated to the client',
    );
  });
});
