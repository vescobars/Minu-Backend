import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';
import { ImageService } from './image.service';
import { faker } from '@faker-js/faker';

describe('ImageService', () => {
  let service: ImageService;
  let repository: Repository<ImageEntity>;
  let imagesList: ImageEntity[];
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ImageService],
    }).compile();
 
    service = module.get<ImageService>(ImageService);
    repository = module.get<Repository<ImageEntity>>(getRepositoryToken(ImageEntity),);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    imagesList = [];
    for(let i = 0; i < 5; i++){
        const image: ImageEntity = await repository.save({
        url: faker.lorem.sentence()})
        imagesList.push(image);
    }
  }
   
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all images', async () => {
    const images: ImageEntity[] = await service.findAll();
    expect(images).not.toBeNull();
    expect(images).toHaveLength(imagesList.length);
  });

  it('findOne should return a image by id', async () => {
    const storedImage: ImageEntity = imagesList[0];
    const image: ImageEntity = await service.findOne(storedImage.id);
    expect(image).not.toBeNull();
    expect(image.url).toEqual(storedImage.url)
  });

  it('findOne should throw an exception for an invalid image', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The image with the given id was not found")
  });

  it('create should return a new image', async () => {
    const image: ImageEntity = {
      id: "",
      url: faker.lorem.sentence(),
      plate: null,
    }

    const newImage: ImageEntity = await service.create(image);
    expect(newImage).not.toBeNull();

    const storedImage: ImageEntity = await repository.findOne({where: {id: newImage.id}})
    expect(storedImage).not.toBeNull();
    expect(storedImage.url).toEqual(newImage.url)

  });

  it('update should modify a image', async () => {
    const image: ImageEntity = imagesList[0];
    image.url = "New url";
  
    const updatedImage: ImageEntity = await service.update(image.id, image);
    expect(updatedImage).not.toBeNull();
  
    const storedImage: ImageEntity = await repository.findOne({ where: { id: image.id } })
    expect(storedImage).not.toBeNull();
    expect(storedImage.url).toEqual(image.url)
  });
 
  it('update should throw an exception for an invalid image', async () => {
    let image: ImageEntity = imagesList[0];
    image = {
      ...image, url: "New url"
    }
    await expect(() => service.update("0", image)).rejects.toHaveProperty("message", "The image with the given id was not found")
  });

  it('delete should remove a image', async () => {
    const image: ImageEntity = imagesList[0];
    await service.delete(image.id);
  
    const deletedMuseum: ImageEntity = await repository.findOne({ where: { id: image.id } })
    expect(deletedMuseum).toBeNull();
  });

  it('delete should throw an exception for an invalid image', async () => {
    const image: ImageEntity = imagesList[0];
    await service.delete(image.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The image with the given id was not found")
  });

 });