import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteOperatorService } from './site-operator.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';

describe('SiteOperatorService', () => {
  let service: SiteOperatorService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let operatorRepository: Repository<RestaurantOperatorEntity>;
  let site: RestaurantSiteEntity;
  let operatorsList : RestaurantOperatorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteOperatorService],
    }).compile();

    service = module.get<SiteOperatorService>(SiteOperatorService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    operatorRepository = module.get<Repository<RestaurantOperatorEntity>>(getRepositoryToken(RestaurantOperatorEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    operatorRepository.clear();
    siteRepository.clear();

    operatorsList = [];
    for(let i = 0; i < 5; i++){
        const operator: RestaurantOperatorEntity = await operatorRepository.save({
          firstname: faker.name.firstName(), 
          cellphone: faker.phone.number('+57 3## ### ####'),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          role: faker.company.bsBuzz(),
          active: faker.datatype.boolean(),
        })
        operatorsList.push(operator);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      restaurantOperators: operatorsList 
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addOperatorSite should add an operator to a site', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addOperatorSite(newSite.id, newOperator.id);
    
    expect(result.restaurantOperators.length).toBe(1);
    expect(result.restaurantOperators[0]).not.toBeNull();
    expect(result.restaurantOperators[0].firstname).toBe(newOperator.firstname)
    expect(result.restaurantOperators[0].cellphone).toBe(newOperator.cellphone)
    expect(result.restaurantOperators[0].lastname).toBe(newOperator.lastname)
    expect(result.restaurantOperators[0].email).toBe(newOperator.email)
    expect(result.restaurantOperators[0].role).toBe(newOperator.role)
    expect(result.restaurantOperators[0].active).toBe(newOperator.active)
  });

  it('addOperatorSite should thrown exception for an invalid operator', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addOperatorSite(newSite.id, "0")).rejects.toHaveProperty("message", "The operator with the given id was not found");
  });

  it('addOperatorSite should throw an exception for an invalid site', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    await expect(() => service.addOperatorSite("0", newOperator.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findOperatorBySiteIdOperatorId should return operator by site', async () => {
    const operator: RestaurantOperatorEntity = operatorsList[0];
    const storedOperator: RestaurantOperatorEntity = await service.findOperatorBySiteIdOperatorId(site.id, operator.id, )
    expect(storedOperator).not.toBeNull();
    expect(storedOperator.firstname).toBe(operator.firstname);
    expect(storedOperator.cellphone).toBe(operator.cellphone);
    expect(storedOperator.lastname).toBe(operator.lastname);
    expect(storedOperator.email).toBe(operator.email);
    expect(storedOperator.role).toBe(operator.role);
    expect(storedOperator.active).toBe(operator.active);
  });

  it('findOperatorBySiteIdOperatorId should throw an exception for an invalid operator', async () => {
    await expect(()=> service.findOperatorBySiteIdOperatorId(site.id, "0")).rejects.toHaveProperty("message", "The operator with the given id was not found"); 
  });

  it('findOperatorBySiteIdOperatorId should throw an exception for an invalid site', async () => {
    const operator: RestaurantOperatorEntity = operatorsList[0]; 
    await expect(()=> service.findOperatorBySiteIdOperatorId("0", operator.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findOperatorBySiteIdOperatorId should throw an exception for an operator not associated to the site', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    await expect(()=> service.findOperatorBySiteIdOperatorId(site.id, newOperator.id)).rejects.toHaveProperty("message", "The operator with the given id is not associated to the site"); 
  });

  it('findOperatorsBySiteId should return restaurantOperators by site', async ()=>{
    const restaurantOperators: RestaurantOperatorEntity[] = await service.findOperatorsBySiteId(site.id);
    expect(restaurantOperators.length).toBe(5)
  });

  it('findOperatorsBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findOperatorsBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateOperatorsSite should update restaurantOperators list for a site', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    const updatedSite: RestaurantSiteEntity = await service.associateOperatorsSite(site.id, [newOperator]);
    expect(updatedSite.restaurantOperators.length).toBe(1);

    expect(updatedSite.restaurantOperators[0].firstname).toBe(newOperator.firstname);
    expect(updatedSite.restaurantOperators[0].cellphone).toBe(newOperator.cellphone);
    expect(updatedSite.restaurantOperators[0].lastname).toBe(newOperator.lastname);
    expect(updatedSite.restaurantOperators[0].email).toBe(newOperator.email);
    expect(updatedSite.restaurantOperators[0].role).toBe(newOperator.role);
    expect(updatedSite.restaurantOperators[0].active).toBe(newOperator.active);
  });

  it('associateOperatorsSite should throw an exception for an invalid site', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    await expect(()=> service.associateOperatorsSite("0", [newOperator])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateOperatorsSite should throw an exception for an invalid operator', async () => {
    const newOperator: RestaurantOperatorEntity = operatorsList[0];
    newOperator.id = "0";

    await expect(()=> service.associateOperatorsSite(site.id, [newOperator])).rejects.toHaveProperty("message", "The operator with the given id was not found"); 
  });

  it('deleteOperatorSite should remove an operator from a site', async () => {
    const operator: RestaurantOperatorEntity = operatorsList[0];
    
    await service.deleteOperatorSite(site.id, operator.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["restaurantOperators"]});
    const deletedOperator: RestaurantOperatorEntity = storedSite.restaurantOperators.find(a => a.id === operator.id);

    expect(deletedOperator).toBeUndefined();

  });

  it('deleteOperatorSite should thrown an exception for an invalid operator', async () => {
    await expect(()=> service.deleteOperatorSite(site.id, "0")).rejects.toHaveProperty("message", "The operator with the given id was not found"); 
  });

  it('deleteOperatorSite should thrown an exception for an invalid site', async () => {
    const operator: RestaurantOperatorEntity = operatorsList[0];
    await expect(()=> service.deleteOperatorSite("0", operator.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteOperatorSite should thrown an exception for an non asocciated operator', async () => {
    const newOperator: RestaurantOperatorEntity = await operatorRepository.save({
      firstname: faker.name.firstName(), 
      cellphone: faker.phone.number('+57 3## ### ####'),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.company.bsBuzz(),
      active: faker.datatype.boolean(),
    });

    await expect(()=> service.deleteOperatorSite(site.id, newOperator.id)).rejects.toHaveProperty("message", "The operator with the given id is not associated to the site"); 
  });
});
