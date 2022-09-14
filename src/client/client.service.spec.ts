import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<ClientEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
