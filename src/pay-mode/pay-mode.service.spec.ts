import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PayModeService } from './pay-mode.service';
import { PayModeEntity} from './pay-mode.entity';
import { faker } from '@faker-js/faker';


describe('PayModeService', () => {
  let service: PayModeService;
  let repository: Repository<PayModeEntity>;
  let payModeList: PayModeEntity[];
  
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
    for(let i = 0; i < 5; i++){
        const paymode: PayModeEntity = await repository.save({
        type: faker.random.word()
      })
      payModeList.push(paymode);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a Pay Mode by id', async () => {
    const storedPayMode: PayModeEntity = payModeList[0];
    const paymode: PayModeEntity = await service.findOne(storedPayMode.id);
    expect(paymode).not.toBeNull();
    expect(paymode.type).toEqual(storedPayMode.type);
    expect(paymode.order).toEqual(storedPayMode.order);
  });

  it('findAll should return all museums', async () => {
    const paymode: PayModeEntity[] = await service.findAll();
    expect(paymode).not.toBeNull();
    expect(paymode).toHaveLength(payModeList.length);
  });

  it('findOne should throw an exception for an invalid paymode', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The paymode with the given id was not found")
  });

  it('create should return a new paymode', async () => {
    const paymode: PayModeEntity = {
      id: "",
      type: faker.random.word(), 
      order: null 
    }

    const newPayMode: PayModeEntity = await service.create(paymode);
    expect(newPayMode).not.toBeNull();

    const storedPayMode: PayModeEntity = await repository.findOne({where: {id: newPayMode.id}})
    expect(storedPayMode).not.toBeNull();
    expect(storedPayMode.type).toEqual(newPayMode.type)
  });

  it('update should modify a paymode', async () => {
    const paymode: PayModeEntity = payModeList[0];
    paymode.type = faker.random.word();
    
    const updatedPayMode: PayModeEntity = await service.update(paymode.id,paymode);
    expect(updatedPayMode).not.toBeNull();
  
    const storedPayMode: PayModeEntity = await repository.findOne({where: {id: paymode.id}})
    expect(storedPayMode).not.toBeNull();
    expect(storedPayMode.type).toEqual(paymode.type)
    expect(storedPayMode.order).toEqual(paymode.order)
  });

  it('update should throw an exception for an invalid paymode', async () => {
    let paymode: PayModeEntity = payModeList[0];
    paymode = {
      ...paymode, type: faker.random.word()
    }
    await expect(() => service.update("0", paymode)).rejects.toHaveProperty("message", "The paymode with the given id was not found")
  });

  it('delete should remove a paymode', async () => {
    const paymode: PayModeEntity = payModeList[0];
    await service.delete(paymode.id);
  
    const deletedPayMode: PayModeEntity = await repository.findOne({ where: { id: paymode.id } })
    expect(deletedPayMode).toBeNull();
  });

  it('delete should throw an exception for an invalid paymode', async () => {
    const paymode: PayModeEntity = payModeList[0];
    await service.delete(paymode.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The paymode with the given id was not found")
  });
});
