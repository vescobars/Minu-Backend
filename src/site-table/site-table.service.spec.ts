import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteTableService } from './site-table.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { TableEntity } from '../table/table.entity';

describe('SiteTableService', () => {
  let service: SiteTableService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let tableRepository: Repository<TableEntity>;
  let site: RestaurantSiteEntity;
  let tablesList : TableEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteTableService],
    }).compile();

    service = module.get<SiteTableService>(SiteTableService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    tableRepository = module.get<Repository<TableEntity>>(getRepositoryToken(TableEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    tableRepository.clear();
    siteRepository.clear();

    tablesList = [];
    for(let i = 0; i < 5; i++){
        const table: TableEntity = await tableRepository.save({
          seats: faker.datatype.number(8),
          number: faker.datatype.number(100),
          occupied: faker.datatype.boolean(),
        })
        tablesList.push(table);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      tables: tablesList 
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addTableSite should add an table to a site', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addTableSite(newSite.id, newTable.id);
    
    expect(result.tables.length).toBe(1);
    expect(result.tables[0]).not.toBeNull();
    expect(result.tables[0].seats).toBe(newTable.seats)
    expect(result.tables[0].number).toBe(newTable.number)
    expect(result.tables[0].occupied).toBe(newTable.occupied)
  });

  it('addTableSite should thrown exception for an invalid table', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addTableSite(newSite.id, "0")).rejects.toHaveProperty("message", "The table with the given id was not found");
  });

  it('addTableSite should throw an exception for an invalid site', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    await expect(() => service.addTableSite("0", newTable.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findTableBySiteIdTableId should return table by site', async () => {
    const table: TableEntity = tablesList[0];
    const storedTable: TableEntity = await service.findTableBySiteIdTableId(site.id, table.id, )
    expect(storedTable).not.toBeNull();
    expect(storedTable.seats).toBe(table.seats);
    expect(storedTable.number).toBe(table.number);
    expect(storedTable.occupied).toBe(table.occupied);
  });

  it('findTableBySiteIdTableId should throw an exception for an invalid table', async () => {
    await expect(()=> service.findTableBySiteIdTableId(site.id, "0")).rejects.toHaveProperty("message", "The table with the given id was not found"); 
  });

  it('findTableBySiteIdTableId should throw an exception for an invalid site', async () => {
    const table: TableEntity = tablesList[0]; 
    await expect(()=> service.findTableBySiteIdTableId("0", table.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findTableBySiteIdTableId should throw an exception for an table not associated to the site', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    await expect(()=> service.findTableBySiteIdTableId(site.id, newTable.id)).rejects.toHaveProperty("message", "The table with the given id is not associated to the site"); 
  });

  it('findTablesBySiteId should return tables by site', async ()=>{
    const tables: TableEntity[] = await service.findTablesBySiteId(site.id);
    expect(tables.length).toBe(5)
  });

  it('findTablesBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findTablesBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateTablesSite should update tables list for a site', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    const updatedSite: RestaurantSiteEntity = await service.associateTablesSite(site.id, [newTable]);
    expect(updatedSite.tables.length).toBe(1);

    expect(updatedSite.tables[0].seats).toBe(newTable.seats);
    expect(updatedSite.tables[0].number).toBe(newTable.number);
    expect(updatedSite.tables[0].occupied).toBe(newTable.occupied);
  });

  it('associateTablesSite should throw an exception for an invalid site', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    await expect(()=> service.associateTablesSite("0", [newTable])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateTablesSite should throw an exception for an invalid table', async () => {
    const newTable: TableEntity = tablesList[0];
    newTable.id = "0";

    await expect(()=> service.associateTablesSite(site.id, [newTable])).rejects.toHaveProperty("message", "The table with the given id was not found"); 
  });

  it('deleteTableSite should remove an table from a site', async () => {
    const table: TableEntity = tablesList[0];
    
    await service.deleteTableSite(site.id, table.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["tables"]});
    const deletedTable: TableEntity = storedSite.tables.find(a => a.id === table.id);

    expect(deletedTable).toBeUndefined();

  });

  it('deleteTableSite should thrown an exception for an invalid table', async () => {
    await expect(()=> service.deleteTableSite(site.id, "0")).rejects.toHaveProperty("message", "The table with the given id was not found"); 
  });

  it('deleteTableSite should thrown an exception for an invalid site', async () => {
    const table: TableEntity = tablesList[0];
    await expect(()=> service.deleteTableSite("0", table.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteTableSite should thrown an exception for an non asocciated table', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats: faker.datatype.number(8),
      number: faker.datatype.number(100),
      occupied: faker.datatype.boolean(),
    });

    await expect(()=> service.deleteTableSite(site.id, newTable.id)).rejects.toHaveProperty("message", "The table with the given id is not associated to the site"); 
  });
});
