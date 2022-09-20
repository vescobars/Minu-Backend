import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';
import { TableService } from './table.service';
import { faker } from '@faker-js/faker';

describe('TableService', () => {
  let service: TableService;
  let repository: Repository<TableEntity>;
  let tableList: TableEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TableService],
    }).compile();

    service = module.get<TableService>(TableService);
    repository = module.get<Repository<TableEntity>>(getRepositoryToken(TableEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tableList = [];
    for(let i = 0; i < 5; i++){
        const table: TableEntity = await repository.save({
        seats:1,
        number: i,
        occupied: faker.datatype.boolean()
      })
        tableList.push(table);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('findAll should return all tables', async () => {
    const tables: TableEntity[] = await service.findAll();
    expect(tables).not.toBeNull();
    expect(tables).toHaveLength(tableList.length);
  });

  it('findOne should return a table by id', async () => {
    const storedTable: TableEntity = tableList[0];
    const table: TableEntity = await service.findOne(storedTable.id);
    expect(table).not.toBeNull();
  });

  it('findOne should throw an exception for an invalid table', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The table with the given id was not found")
  });

  it('create should return a new table', async () => {
    const table: TableEntity = {
      id: "",
      seats: 4,
      number: faker.datatype.number(),
      occupied: faker.datatype.boolean(),
      order: null,
      restaurantSite: null
    }
 
    const newTable: TableEntity = await service.create(table);
    expect(newTable).not.toBeNull();
 
    const storedTable: TableEntity = await repository.findOne({where: {id: newTable.id}})
    expect(storedTable).not.toBeNull();
  });

  it('update should modify a table', async () => {
    const table: TableEntity = tableList[0];
    table.occupied = faker.datatype.boolean();
    table.seats= 1;
    const updatedTable: TableEntity = await service.update(table.id, table);
    expect(updatedTable).not.toBeNull();
    const storedTable: TableEntity = await repository.findOne({ where: { id: table.id } })
    expect(storedTable).not.toBeNull();
    expect(storedTable.occupied).toEqual(table.occupied)
  });

  it('update should throw an exception for an invalid table', async () => {
    let table: TableEntity = tableList[0];
    table = {
      ...table, seats:1, occupied: faker.datatype.boolean()
    }
    await expect(() => service.update("0", table)).rejects.toHaveProperty("message", "The table with the given id was not found")
    
  });

  it('delete should remove a table', async () => {
    const table: TableEntity = tableList[0];
    await service.delete(table.id);
    const deletedTable: TableEntity = await repository.findOne({ where: { id: table.id } })
    expect(deletedTable).toBeNull();
  });

  it('delete should throw an exception for an invalid table', async () => {
    const table: TableEntity = tableList[0];
    await service.delete(table.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The table with the given id was not found")
  });
});
