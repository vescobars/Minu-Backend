import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteReviewService } from './site-review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ReviewEntity } from '../review/review.entity';

describe('SiteReviewService', () => {
  let service: SiteReviewService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let reviewRepository: Repository<ReviewEntity>;
  let site: RestaurantSiteEntity;
  let reviewsList : ReviewEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteReviewService],
    }).compile();

    service = module.get<SiteReviewService>(SiteReviewService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    reviewRepository = module.get<Repository<ReviewEntity>>(getRepositoryToken(ReviewEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    reviewRepository.clear();
    siteRepository.clear();

    reviewsList = [];
    for(let i = 0; i < 5; i++){
        const review: ReviewEntity = await reviewRepository.save({
          score: faker.datatype.number(5),
          description: faker.lorem.sentence(),
        })
        reviewsList.push(review);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      reviews: reviewsList 
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReviewSite should add an review to a site', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addReviewSite(newSite.id, newReview.id);
    
    expect(result.reviews.length).toBe(1);
    expect(result.reviews[0]).not.toBeNull();
    expect(result.reviews[0].score).toBe(newReview.score)
    expect(result.reviews[0].description).toStrictEqual(newReview.description)
  });

  it('addReviewSite should thrown exception for an invalid review', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addReviewSite(newSite.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found");
  });

  it('addReviewSite should throw an exception for an invalid site', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    await expect(() => service.addReviewSite("0", newReview.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findReviewBySiteIdReviewId should return review by site', async () => {
    const review: ReviewEntity = reviewsList[0];
    const storedOperator: ReviewEntity = await service.findReviewBySiteIdReviewId(site.id, review.id, )
    expect(storedOperator).not.toBeNull();
    expect(storedOperator.score).toBe(review.score);
    expect(storedOperator.description).toStrictEqual(review.description);
  });

  it('findReviewBySiteIdReviewId should throw an exception for an invalid review', async () => {
    await expect(()=> service.findReviewBySiteIdReviewId(site.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found"); 
  });

  it('findReviewBySiteIdReviewId should throw an exception for an invalid site', async () => {
    const review: ReviewEntity = reviewsList[0]; 
    await expect(()=> service.findReviewBySiteIdReviewId("0", review.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findReviewBySiteIdReviewId should throw an exception for an review not associated to the site', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.findReviewBySiteIdReviewId(site.id, newReview.id)).rejects.toHaveProperty("message", "The review with the given id is not associated to the site"); 
  });

  it('findReviewsBySiteId should return reviews by site', async ()=>{
    const reviews: ReviewEntity[] = await service.findReviewsBySiteId(site.id);
    expect(reviews.length).toBe(5)
  });

  it('findReviewsBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findReviewsBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateReviewsSite should update reviews list for a site', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    const updatedSite: RestaurantSiteEntity = await service.associateReviewsSite(site.id, [newReview]);
    expect(updatedSite.reviews.length).toBe(1);

    expect(updatedSite.reviews[0].score).toBe(newReview.score);
    expect(updatedSite.reviews[0].description).toStrictEqual(newReview.description);
  });

  it('associateReviewsSite should throw an exception for an invalid site', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.associateReviewsSite("0", [newReview])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateReviewsSite should throw an exception for an invalid review', async () => {
    const newReview: ReviewEntity = reviewsList[0];
    newReview.id = "0";

    await expect(()=> service.associateReviewsSite(site.id, [newReview])).rejects.toHaveProperty("message", "The review with the given id was not found"); 
  });

  it('deleteReviewSite should remove an review from a site', async () => {
    const review: ReviewEntity = reviewsList[0];
    
    await service.deleteReviewSite(site.id, review.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["reviews"]});
    const deletedOrder: ReviewEntity = storedSite.reviews.find(a => a.id === review.id);

    expect(deletedOrder).toBeUndefined();

  });

  it('deleteReviewSite should thrown an exception for an invalid review', async () => {
    await expect(()=> service.deleteReviewSite(site.id, "0")).rejects.toHaveProperty("message", "The review with the given id was not found"); 
  });

  it('deleteReviewSite should thrown an exception for an invalid site', async () => {
    const review: ReviewEntity = reviewsList[0];
    await expect(()=> service.deleteReviewSite("0", review.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteReviewSite should thrown an exception for an non asocciated review', async () => {
    const newReview: ReviewEntity = await reviewRepository.save({
      score: faker.datatype.number(5),
      description: faker.lorem.sentence(),
    });

    await expect(()=> service.deleteReviewSite(site.id, newReview.id)).rejects.toHaveProperty("message", "The review with the given id is not associated to the site"); 
  });
});
