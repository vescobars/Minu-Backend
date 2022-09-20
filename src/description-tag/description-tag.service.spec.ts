import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DescriptionTagEntity } from './description-tag.entity';
import { DescriptionTagService } from './description-tag.service';
import { faker } from '@faker-js/faker';
import { PlateEntity } from '../plate/plate.entity';

describe('DescriptionTagService', () => {
  let service: DescriptionTagService;
  let repository: Repository<DescriptionTagEntity>;
  const descriptionTagsList = []

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DescriptionTagService],
    }).compile();

    service = module.get<DescriptionTagService>(DescriptionTagService);
    repository = module.get<Repository<DescriptionTagEntity>>(getRepositoryToken(DescriptionTagEntity));
    descriptionTagsList.length = 0;
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    for(let i = 0; i < 5; i++){
        const descriptionTag: DescriptionTagEntity = await repository.save({
          id: faker.datatype.uuid(),
          name: faker.datatype.string(),
        })
        descriptionTagsList.push(descriptionTag);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all descriptionTags', async () => {
    const descriptionTags: DescriptionTagEntity[] = await service.findAll();
    expect(descriptionTags).not.toBeNull();
    expect(descriptionTags).toHaveLength(descriptionTagsList.length);
  });

  it('findOne should return a descriptionTag by id', async () => {
    const storedDescriptionTag: DescriptionTagEntity = descriptionTagsList[0];
    const descriptionTag: DescriptionTagEntity = await service.findOne(storedDescriptionTag.id);
    expect(descriptionTag).not.toBeNull();
    expect(descriptionTag.name).toEqual(storedDescriptionTag.name)
  });

  it('create should return a new descriptionTag', async () => {
    const descriptionTag: DescriptionTagEntity = {
      id: "",
      name: faker.datatype.string(),
      plate: new PlateEntity(),
    }
 
    const newDescriptionTag: DescriptionTagEntity = await service.create(descriptionTag);
    expect(newDescriptionTag).not.toBeNull();
 
    const storedDescriptionTag: DescriptionTagEntity = await repository.findOne({where: {id: newDescriptionTag.id}})
    expect(storedDescriptionTag).not.toBeNull();
    expect(storedDescriptionTag.name).toEqual(newDescriptionTag.name)
  });

  it('update should modify a descriptionTag', async () => {
    const descriptionTag: DescriptionTagEntity = descriptionTagsList[0];
    descriptionTag.name = "New name";
     const updatedDescriptionTag: DescriptionTagEntity = await service.update(descriptionTag.id, descriptionTag);
    expect(updatedDescriptionTag).not.toBeNull();
     const storedDescriptionTag: DescriptionTagEntity = await repository.findOne({ where: { id: descriptionTag.id } })
    expect(storedDescriptionTag).not.toBeNull();
    expect(storedDescriptionTag.name).toEqual(descriptionTag.name)
  });

  it('delete should remove a descriptionTag', async () => {
    const descriptionTag: DescriptionTagEntity = descriptionTagsList[0];
    await service.delete(descriptionTag.id);
     const deletedDescriptionTag: DescriptionTagEntity = await repository.findOne({ where: { id: descriptionTag.id } })
    expect(deletedDescriptionTag).toBeNull();
  });
});
