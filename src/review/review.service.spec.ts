import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';
import { faker } from '@faker-js/faker';
import { ClientEntity } from '../client/client.entity';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: Repository<ReviewEntity>;
  const reviewsList = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReviewService],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<Repository<ReviewEntity>>(getRepositoryToken(ReviewEntity));
    reviewsList.length = 0;
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for(let i = 0; i < 5; i++){
        const review: ReviewEntity = await repository.save({
        id: faker.datatype.uuid(),
        score: faker.datatype.number(),
        description: faker.lorem.sentence()})
        reviewsList.push(review);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all reviews', async () => {
    const reviews: ReviewEntity[] = await service.findAll();
    expect(reviews).not.toBeNull();
    expect(reviews).toHaveLength(reviewsList.length);
  });

  it('findAll should return all reviews', async () => {
    const reviews: ReviewEntity[] = await service.findAll();
    expect(reviews).not.toBeNull();
    expect(reviews).toHaveLength(reviewsList.length);
  });

  it('create should return a new review', async () => {
    const review: ReviewEntity = {
      id: "",
      score: faker.datatype.number(),
      description: faker.lorem.sentence(),
      client: new ClientEntity(),
      restaurantSite: []
    }
 
    const newReview: ReviewEntity = await service.create(review);
    expect(newReview).not.toBeNull();
 
    const storedReview: ReviewEntity = await repository.findOne({where: {id: newReview.id}})
    expect(storedReview).not.toBeNull();
    expect(storedReview.id).toEqual(newReview.id)
    expect(storedReview.description).toEqual(newReview.description)
  });

  it('update should modify a review', async () => {
    const review: ReviewEntity = reviewsList[0];
    review.description = "New description";
     const updatedReview: ReviewEntity = await service.update(review.id, review);
    expect(updatedReview).not.toBeNull();
     const storedReview: ReviewEntity = await repository.findOne({ where: { id: review.id } })
    expect(storedReview).not.toBeNull();
    expect(storedReview.description).toEqual(review.description)
  });

  it('delete should remove a review', async () => {
    const review: ReviewEntity = reviewsList[0];
    await service.delete(review.id);
     const deletedReview: ReviewEntity = await repository.findOne({ where: { id: review.id } })
    expect(deletedReview).toBeNull();
  });

});
