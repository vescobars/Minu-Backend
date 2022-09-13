import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PayModeService } from './pay-mode.service';
import { PayModeEntity} from './pay-mode.entity';

describe('PayModeService', () => {
  let service: PayModeService;
  let repository: Repository<PayModeEntity>;
  let payModeList: PayModeEntity[];
  let payTypesList: string[];
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PayModeService],
    }).compile();

    service = module.get<PayModeService>(PayModeService);
    repository = module.get<Repository<PayModeEntity>>(getRepositoryToken(PayModeEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    payModeList = [];
    payTypesList = ['Daviplata','PSE','Tarjeta de Credito','Tarjeta de Debito','Efectivo','Nequi','RappiPay','Coink','GooglePay','SamsungPay','ApplePay','Cheque']
    for(let i = 0; i < 5; i++){
        const paymode: PayModeEntity = await repository.save({
        type: payTypesList[Math.random() * payTypesList.length]})
        payModeList.push(paymode);
    }
  }
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
