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
  let tableSeatList: number[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TableService],
    }).compile();

    service = module.get<TableService>(TableService);
    repository = module.get<Repository<TableEntity>>(getRepositoryToken(TableEntity));
    //await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
