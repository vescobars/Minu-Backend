import { Test, TestingModule } from '@nestjs/testing';
import { OrderEntity } from '../order/order.entity';
import { TableEntity } from '../table/table.entity';
import { Repository } from 'typeorm';
import { OrderTableService } from './order-table.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('OrderTableService', () => {
  let service: OrderTableService;
  let orderRepository: Repository<OrderEntity>;
  let tableRepository: Repository<TableEntity>;
  let order: OrderEntity;
  let table : TableEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [OrderTableService],
    }).compile();

    tableRepository = module.get<Repository<TableEntity>>(getRepositoryToken(TableEntity));
    orderRepository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity)); 
    service = module.get<OrderTableService>(OrderTableService);
    await seedDatabase();
  });


  const seedDatabase = async () => {
    orderRepository.clear();
    tableRepository.clear();
 
    table = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    })

    order = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:table,
      payMode:null,
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('addTableOrder should add an table to a order', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    });
 
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    const result: OrderEntity = await service.addTableOrder(newOrder.id, newTable.id);
   
    expect(result.table).not.toBeNull();
    expect(result.table.id).toEqual(newTable.id);
    expect(result.table.seats).toEqual(newTable.seats);
    expect(result.table.number).toEqual(newTable.number);
    expect(result.table.occupied).toEqual(newTable.occupied);
  });

  it('addTableOrder should thrown exception for an invalid table', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    });
 
    await expect(() => service.addTableOrder(newTable.id, "0")).rejects.toHaveProperty("message", "The table with the given id was not found");
  });

  it('addTableOrder should throw an exception for an invalid order', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: 14000,
      orderDetail: null,
      table:null,
      payMode:null,
    })
 
    await expect(() => service.addTableOrder("0", newOrder.id)).rejects.toHaveProperty("message", "The table with the given id was not found");
  });

  it('findTableByOrderIdTableId should return table by order', async () => {
    const tablex: TableEntity = table;
    const storedTable: TableEntity = await service.findTableByOrderIdTableId(order.id, tablex.id, )
    expect(storedTable).not.toBeNull();
    expect(storedTable.id).toEqual(tablex.id);
    expect(storedTable.seats).toEqual(tablex.seats);
    expect(storedTable.number).toEqual(tablex.number);
    expect(storedTable.occupied).toEqual(tablex.occupied);
  });

  it('findTableByOrderIdTableId should throw an exception for an invalid table', async () => {
    await expect(()=> service.findTableByOrderIdTableId(order.id, "0")).rejects.toHaveProperty("message", "The table with the given id was not found");
  });

  it('findTableByOrderIdTableId should throw an exception for an invalid order', async () => {
    const tablex: TableEntity = table;
    await expect(()=> service.findTableByOrderIdTableId("0", tablex.id)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });


  it('findTableByOrderId should return table by order', async ()=>{
    const tablex: TableEntity = await service.findTableByOrderId(order.id);
    expect(tablex).not.toBeNull();
    expect(tablex.id).toEqual(table.id);
    expect(tablex.seats).toEqual(table.seats);
    expect(tablex.number).toEqual(table.number);
    expect(tablex.occupied).toEqual(table.occupied);
  });

  it('findTableByOrderId should throw an exception for an invalid order', async () => {
    await expect(()=> service.findTableByOrderId("0")).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associateTableOrder should update table list for a order', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    });
 
    const updatedOrder: OrderEntity = await service.associateTableOrder(order.id, newTable);
    
    expect(updatedOrder.table.seats).toEqual(newTable.seats);
    expect(updatedOrder.table.number).toEqual(newTable.number);
    expect(updatedOrder.table.occupied).toEqual(newTable.occupied);
  });

  it('associateTableOrder should throw an exception for an invalid order', async () => {
    const newTable: TableEntity = await tableRepository.save({
      seats:faker.datatype.number({max:16}),
      number: faker.datatype.number({max:100}),
      occupied: faker.datatype.boolean()
    });
 
    await expect(()=> service.associateTableOrder("0", newTable)).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('associateTableOrder should throw an exception for an invalid table', async () => {
    const newTable: TableEntity = table;
    newTable.id = "0";
 
    await expect(()=> service.associateTableOrder(order.id, newTable)).rejects.toHaveProperty("message", "The table with the given id was not found");
  });

  it('deleteTableOrder should remove an table from a order', async () => {
    const tablex: TableEntity = table;
   
    await service.deleteTableOrder(order.id, tablex.id);
 
    const storedOrder: OrderEntity = await orderRepository.findOne({where: {id: order.id}, relations:  ["orderDetail","payMode","table"]});
    const deletedTable: TableEntity = storedOrder.table;
 
    expect(deletedTable).toBeNull();
 
  });
});
