import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SiteScheduleService } from './site-schedule.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from '../schedule/schedule.entity';

describe('SiteScheduleService', () => {
  let service: SiteScheduleService;
  let siteRepository: Repository<RestaurantSiteEntity>;
  let scheduleRepository: Repository<ScheduleEntity>;
  let site: RestaurantSiteEntity;
  let schedulesList : ScheduleEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SiteScheduleService],
    }).compile();

    service = module.get<SiteScheduleService>(SiteScheduleService);
    siteRepository = module.get<Repository<RestaurantSiteEntity>>(getRepositoryToken(RestaurantSiteEntity));
    scheduleRepository = module.get<Repository<ScheduleEntity>>(getRepositoryToken(ScheduleEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    scheduleRepository.clear();
    siteRepository.clear();

    schedulesList = [];
    for(let i = 0; i < 5; i++){
        const schedule: ScheduleEntity = await scheduleRepository.save({
          day: faker.lorem.word(),
          opening_hour: "11:00",
          closing_hour: "23:00",
        })
        schedulesList.push(schedule);
    }

    site = await siteRepository.save({
      description: faker.lorem.sentence(),
      schedules: schedulesList 
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addScheduleSite should add an schedule to a site', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    const result: RestaurantSiteEntity = await service.addScheduleSite(newSite.id, newSchedule.id);
    
    expect(result.schedules.length).toBe(1);
    expect(result.schedules[0]).not.toBeNull();
    expect(result.schedules[0].day).toBe(newSchedule.day)
    expect(result.schedules[0].opening_hour).toBe(newSchedule.opening_hour)
    expect(result.schedules[0].closing_hour).toBe(newSchedule.closing_hour)
  });

  it('addScheduleSite should thrown exception for an invalid schedule', async () => {
    const newSite: RestaurantSiteEntity = await siteRepository.save({
      description: faker.lorem.sentence(), 
    })

    await expect(() => service.addScheduleSite(newSite.id, "0")).rejects.toHaveProperty("message", "The schedule with the given id was not found");
  });

  it('addScheduleSite should throw an exception for an invalid site', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    await expect(() => service.addScheduleSite("0", newSchedule.id)).rejects.toHaveProperty("message", "The site with the given id was not found");
  });

  it('findScheduleBySiteIdScheduleId should return schedule by site', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    const storedSchedule: ScheduleEntity = await service.findScheduleBySiteIdScheduleId(site.id, schedule.id, )
    expect(storedSchedule).not.toBeNull();
    expect(storedSchedule.day).toBe(schedule.day);
    expect(storedSchedule.opening_hour).toBe(schedule.opening_hour);
    expect(storedSchedule.closing_hour).toBe(schedule.closing_hour);
  });

  it('findScheduleBySiteIdScheduleId should throw an exception for an invalid schedule', async () => {
    await expect(()=> service.findScheduleBySiteIdScheduleId(site.id, "0")).rejects.toHaveProperty("message", "The schedule with the given id was not found"); 
  });

  it('findScheduleBySiteIdScheduleId should throw an exception for an invalid site', async () => {
    const schedule: ScheduleEntity = schedulesList[0]; 
    await expect(()=> service.findScheduleBySiteIdScheduleId("0", schedule.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('findScheduleBySiteIdScheduleId should throw an exception for an schedule not associated to the site', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    await expect(()=> service.findScheduleBySiteIdScheduleId(site.id, newSchedule.id)).rejects.toHaveProperty("message", "The schedule with the given id is not associated to the site"); 
  });

  it('findSchedulesBySiteId should return schedules by site', async ()=>{
    const schedules: ScheduleEntity[] = await service.findSchedulesBySiteId(site.id);
    expect(schedules.length).toBe(5)
  });

  it('findSchedulesBySiteId should throw an exception for an invalid site', async () => {
    await expect(()=> service.findSchedulesBySiteId("0")).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateSchedulesSite should update schedules list for a site', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    const updatedSite: RestaurantSiteEntity = await service.associateSchedulesSite(site.id, [newSchedule]);
    expect(updatedSite.schedules.length).toBe(1);

    expect(updatedSite.schedules[0].day).toBe(newSchedule.day);
    expect(updatedSite.schedules[0].opening_hour).toBe(newSchedule.opening_hour);
    expect(updatedSite.schedules[0].closing_hour).toBe(newSchedule.closing_hour);
  });

  it('associateSchedulesSite should throw an exception for an invalid site', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    await expect(()=> service.associateSchedulesSite("0", [newSchedule])).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('associateSchedulesSite should throw an exception for an invalid schedule', async () => {
    const newSchedule: ScheduleEntity = schedulesList[0];
    newSchedule.id = "0";

    await expect(()=> service.associateSchedulesSite(site.id, [newSchedule])).rejects.toHaveProperty("message", "The schedule with the given id was not found"); 
  });

  it('deleteScheduleSite should remove an schedule from a site', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    
    await service.deleteScheduleSite(site.id, schedule.id);

    const storedSite: RestaurantSiteEntity = await siteRepository.findOne({where: {id: site.id}, relations: ["schedules"]});
    const deletedSchedule: ScheduleEntity = storedSite.schedules.find(a => a.id === schedule.id);

    expect(deletedSchedule).toBeUndefined();

  });

  it('deleteScheduleSite should thrown an exception for an invalid schedule', async () => {
    await expect(()=> service.deleteScheduleSite(site.id, "0")).rejects.toHaveProperty("message", "The schedule with the given id was not found"); 
  });

  it('deleteScheduleSite should thrown an exception for an invalid site', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    await expect(()=> service.deleteScheduleSite("0", schedule.id)).rejects.toHaveProperty("message", "The site with the given id was not found"); 
  });

  it('deleteScheduleSite should thrown an exception for an non asocciated schedule', async () => {
    const newSchedule: ScheduleEntity = await scheduleRepository.save({
      day: faker.lorem.word(),
      opening_hour: "11:00",
      closing_hour: "23:00",
    });

    await expect(()=> service.deleteScheduleSite(site.id, newSchedule.id)).rejects.toHaveProperty("message", "The schedule with the given id is not associated to the site"); 
  });
});
