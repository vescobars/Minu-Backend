import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { PlateEntity } from '../plate/plate.entity';
import { OrderDetailPlatesService } from './order-detail-plates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderDetailPlatesService', () => {
  let service: OrderDetailPlatesService;
  let orderDetailRepository: Repository<OrderDetailEntity>;
  let plateRepository: Repository<PlateEntity>;
  let orderDetail: OrderDetailEntity;
  let plateList : PlateEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderDetailPlatesService],
    }).compile();

    orderDetailRepository = module.get<Repository<OrderDetailEntity>>(getRepositoryToken(OrderDetailEntity));
    plateRepository = module.get<Repository<PlateEntity>>(getRepositoryToken(PlateEntity)); 
    service = module.get<OrderDetailPlatesService>(OrderDetailPlatesService);
    await seedDatabase();
  });

  const seedDatabase = async () => {
    plateRepository.clear();
    orderDetailRepository.clear();
 
    plateList = [];
    for(let i = 0; i < 5; i++){
        const plate: PlateEntity = await plateRepository.save({
          name: faker.name.fullName(),
          description: faker.lorem.sentence(),
          value: faker.datatype.number(),
          notes: faker.lorem.sentence()
        })
        plateList.push(plate);
    }
 
    orderDetail = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: plateList
    })
  }
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPlateOrderDetail should add a plate to a orderDetail', async () => {
    const newPlate: PlateEntity = await plateRepository.save({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: faker.datatype.number(),
      notes: faker.lorem.sentence()
    });
 
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: []
    })
 
    const result: OrderDetailEntity = await service.addPlateOrderDetail(newOrderDetail.id, newPlate.id);
   
    expect(result.plates.length).toBe(1);
    expect(result.plates[0]).not.toBeNull();
    expect(result.plates[0].name).toBe(newPlate.name);
    expect(result.plates[0].description).toBe(newPlate.description);
    expect(result.plates[0].value).toBe(newPlate.value);
    expect(result.plates[0].notes).toBe(newPlate.notes);
  });

  it('addPlateOrderDetail should thrown exception for an invalid plate', async () => {
    const newOrderDetail: OrderDetailEntity = await orderDetailRepository.save({
      notes: faker.random.words(),
      order: null,
      plates: []
    })
 
    await expect(() => service.addPlateOrderDetail(newOrderDetail.id, "0")).rejects.toHaveProperty("message", "The plate with the given id was not found");
  });

  it('addPlateOrderDetail should throw an exception for an invalid orderDetail', async () => {
    const newPlate: PlateEntity = await plateRepository.save({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: faker.datatype.number(),
      notes: faker.lorem.sentence()
    });
 
    await expect(() => service.addPlateOrderDetail("0", newPlate.id)).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('findPlateByOrderDetailIdPlateId should return plate by orderDetail', async () => {
    const plate: PlateEntity = plateList[0];
    const storedPlate: PlateEntity = await service.findPlateByOrderDetailIdPlateId(orderDetail.id, plate.id);
    expect(storedPlate).not.toBeNull();
    expect(storedPlate.name).toBe(plate.name);
    expect(storedPlate.description).toBe(plate.description);
    expect(storedPlate.value).toBe(plate.value);
    expect(storedPlate.notes).toBe(plate.notes);
  });

  it('findPlateByOrderDetailIdPlateId should throw an exception for an invalid plate', async () => {
    await expect(()=> service.findPlateByOrderDetailIdPlateId(orderDetail.id, "0")).rejects.toHaveProperty("message", "The plate with the given id was not found");
  });

  it('findPlateByOrderDetailIdPlateId should throw an exception for an invalid orderDetail', async () => {
    const plate: PlateEntity = plateList[0];
    await expect(()=> service.findPlateByOrderDetailIdPlateId("0", plate.id)).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('findPlateByOrderDetailIdPlateId should throw an exception for a plate not associated to the orderDetail', async () => {
    const newPlate: PlateEntity = await plateRepository.save({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: faker.datatype.number(),
      notes: faker.lorem.sentence()
    });
 
    await expect(()=> service.findPlateByOrderDetailIdPlateId(orderDetail.id, newPlate.id)).rejects.toHaveProperty("message", "The plate with the given id is not associated to the orderDetail");
  });

  it('findPlatesByOrderDetailId should return plates by orderDetail', async ()=>{
    const plates: PlateEntity[] = await service.findPlatesByOrderDetailId(orderDetail.id);
    expect(plates.length).toBe(5)
  });

  it('findPlatesByOrderDetailId should throw an exception for an invalid orderDetail', async () => {
    await expect(()=> service.findPlatesByOrderDetailId("0")).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  it('associatePlatesOrderDetail should update plates list for a orderDetail', async () => {
    const newPlate: PlateEntity = await plateRepository.save({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: faker.datatype.number(),
      notes: faker.lorem.sentence()
    });
 
    const updatedOrderDetail: OrderDetailEntity = await service.associatePlatesOrderDetail(orderDetail.id, [newPlate]);
    expect(updatedOrderDetail.plates.length).toBe(1);
    expect(updatedOrderDetail.plates[0]).not.toBeNull();
    expect(updatedOrderDetail.plates[0].name).toBe(newPlate.name);
    expect(updatedOrderDetail.plates[0].description).toBe(newPlate.description);
    expect(updatedOrderDetail.plates[0].value).toBe(newPlate.value);
    expect(updatedOrderDetail.plates[0].notes).toBe(newPlate.notes);
  });

  it('associatePlatesOrderDetail should throw an exception for an invalid orderDetail', async () => {
    const newPlate: PlateEntity = await plateRepository.save({
      name: faker.name.fullName(),
      description: faker.lorem.sentence(),
      value: faker.datatype.number(),
      notes: faker.lorem.sentence()
    });
 
    await expect(()=> service.associatePlatesOrderDetail("0", [newPlate])).rejects.toHaveProperty("message", "The orderDetail with the given id was not found");
  });

  
});
