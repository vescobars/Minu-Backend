import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteOrderService } from './site-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { OrderEntity } from '../order/order.entity';

describe('SiteOrderService', () => {
  let service: SiteOrderService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let orderRepository: Repository<OrderEntity>;
  let site: RestaurantSiteEntity;
  let ordersList : OrderEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteOrderService],
    }).compile();

    service = module.get<SiteOrderService>(SiteOrderService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    orderRepository = module.get<Repository<OrderEntity>>(getRepositoryToken(OrderEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    orderRepository.clear();
    siteRepository.clear();

    ordersList = [];
    for(let i = 0; i < 5; i++){
        const order: OrderEntity = await orderRepository.save({
          state: faker.random.word(),
          date: faker.date.recent(),
          totalValue: faker.datatype.number(100000),
        })
        ordersList.push(order);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      orders: ordersList 
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addOrderSite should add an order to a site', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addOrderSite(newSite.id, newOrder.id);
    
    expect(result.orders.length).toBe(1);
    expect(result.orders[0]).not.toBeNull();
    expect(result.orders[0].state).toBe(newOrder.state)
    expect(result.orders[0].date).toStrictEqual(newOrder.date)
    expect(result.orders[0].totalValue).toBe(newOrder.totalValue)
  });

  it('addOrderSite should thrown exception for an invalid order', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addOrderSite(newSite.id, "0")).rejects.toHaveProperty("message", "The order with the given id was not found");
  });

  it('addOrderSite should throw an exception for an invalid site', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    await expect(() => service.addOrderSite("0", newOrder.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findOrderBySiteIdOrderId should return order by site', async () => {
    const order: OrderEntity = ordersList[0];
    const storedOperator: OrderEntity = await service.findOrderBySiteIdOrderId(site.id, order.id, )
    expect(storedOperator).not.toBeNull();
    expect(storedOperator.state).toBe(order.state);
    expect(storedOperator.date).toStrictEqual(order.date);
    expect(storedOperator.totalValue).toBe(order.totalValue);
  });

  it('findOrderBySiteIdOrderId should throw an exception for an invalid order', async () => {
    await expect(()=> service.findOrderBySiteIdOrderId(site.id, "0")).rejects.toHaveProperty("message", "The order with the given id was not found"); 
  });

  it('findOrderBySiteIdOrderId should throw an exception for an invalid site', async () => {
    const order: OrderEntity = ordersList[0]; 
    await expect(()=> service.findOrderBySiteIdOrderId("0", order.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findOrderBySiteIdOrderId should throw an exception for an order not associated to the site', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    await expect(()=> service.findOrderBySiteIdOrderId(site.id, newOrder.id)).rejects.toHaveProperty("message", "The order with the given id is not associated to the site"); 
  });

  it('findOrdersBySiteId should return orders by site', async ()=>{
    const orders: OrderEntity[] = await service.findOrdersBySiteId(site.id);
    expect(orders.length).toBe(5)
  });

  it('findOrdersBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findOrdersBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateOrdersSite should update orders list for a site', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    const updatedSite: RestaurantSiteEntity = await service.associateOrdersSite(site.id, [newOrder]);
    expect(updatedSite.orders.length).toBe(1);

    expect(updatedSite.orders[0].state).toBe(newOrder.state);
    expect(updatedSite.orders[0].date).toStrictEqual(newOrder.date);
    expect(updatedSite.orders[0].totalValue).toBe(newOrder.totalValue);
  });

  it('associateOrdersSite should throw an exception for an invalid site', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    await expect(()=> service.associateOrdersSite("0", [newOrder])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateOrdersSite should throw an exception for an invalid order', async () => {
    const newOrder: OrderEntity = ordersList[0];
    newOrder.id = "0";

    await expect(()=> service.associateOrdersSite(site.id, [newOrder])).rejects.toHaveProperty("message", "The order with the given id was not found"); 
  });

  it('deleteOrderSite should remove an order from a site', async () => {
    const order: OrderEntity = ordersList[0];
    
    await service.deleteOrderSite(site.id, order.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["orders"]});
    const deletedOrder: OrderEntity = storedSite.orders.find(a => a.id === order.id);

    expect(deletedOrder).toBeUndefined();

  });

  it('deleteOrderSite should thrown an exception for an invalid order', async () => {
    await expect(()=> service.deleteOrderSite(site.id, "0")).rejects.toHaveProperty("message", "The order with the given id was not found"); 
  });

  it('deleteOrderSite should thrown an exception for an invalid site', async () => {
    const order: OrderEntity = ordersList[0];
    await expect(()=> service.deleteOrderSite("0", order.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteOrderSite should thrown an exception for an non asocciated order', async () => {
    const newOrder: OrderEntity = await orderRepository.save({
      state: faker.random.word(),
      date: faker.date.recent(),
      totalValue: faker.datatype.number(100000),
    });

    await expect(()=> service.deleteOrderSite(site.id, newOrder.id)).rejects.toHaveProperty("message", "The order with the given id is not associated to the site"); 
  });
});
