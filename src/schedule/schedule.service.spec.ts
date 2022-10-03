/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { ScheduleService } from './schedule.service';
import { ScheduleEntity } from './schedule.entity';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let repository: Repository<ScheduleEntity>;
  let schedulesList: ScheduleEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ScheduleService],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    repository = module.get<Repository<ScheduleEntity>>(
      getRepositoryToken(ScheduleEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    schedulesList = [];
    for (let i = 0; i < 5; i++) {
      const schedule: ScheduleEntity = await repository.save({
        day: faker.date.weekday(),
        opening_hour: faker.date.weekday(),
        closing_hour: faker.date.weekday(),
      });
      schedulesList.push(schedule);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all schedules', async () => {
    const schedules: ScheduleEntity[] = await service.findAll();
    expect(schedules).not.toBeNull();
    expect(schedules).toHaveLength(schedulesList.length);
  });

  it('findOne should return a schedule by id', async () => {
    const storedSchedule: ScheduleEntity = schedulesList[0];
    const schedule: ScheduleEntity = await service.findOne(storedSchedule.id);
    expect(schedule).not.toBeNull();
    expect(schedule.day).toEqual(storedSchedule.day);
    expect(schedule.opening_hour).toEqual(storedSchedule.opening_hour);
    expect(schedule.closing_hour).toEqual(storedSchedule.closing_hour);
  });

  it('findOne should throw an exception for an invalid schedule', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The schedule with the given id was not found',
    );
  });

  it('create should return a new schedule', async () => {
    const schedule: ScheduleEntity = {
      id: '',
      day: faker.date.weekday(),
      opening_hour: faker.date.weekday(),
      closing_hour: faker.date.weekday(),
      restaurantSite: null,
    };

    const newSchedule: ScheduleEntity = await service.create(schedule);
    expect(newSchedule).not.toBeNull();

    const storedSchedule: ScheduleEntity = await repository.findOne({
      where: { id: newSchedule.id },
    });
    expect(storedSchedule).not.toBeNull();
    expect(storedSchedule.day).toEqual(newSchedule.day);
    expect(storedSchedule.opening_hour).toEqual(newSchedule.opening_hour);
    expect(storedSchedule.closing_hour).toEqual(newSchedule.closing_hour);
  });

  it('update should modify a schedule', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    schedule.day = 'New day';

    const updatedSchedule: ScheduleEntity = await service.update(
      schedule.id,
      schedule,
    );
    expect(updatedSchedule).not.toBeNull();

    const storedSchedule: ScheduleEntity = await repository.findOne({
      where: { id: schedule.id },
    });
    expect(storedSchedule).not.toBeNull();
    expect(storedSchedule.day).toEqual(schedule.day);
  });

  it('update should throw an exception for an invalid schedule', async () => {
    let schedule: ScheduleEntity = schedulesList[0];
    schedule = {
      ...schedule,
      day: 'New day',
    };
    await expect(() => service.update('0', schedule)).rejects.toHaveProperty(
      'message',
      'The schedule with the given id was not found',
    );
  });

  it('delete should remove a schedule', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    await service.delete(schedule.id);

    const deletedSchedule: ScheduleEntity = await repository.findOne({
      where: { id: schedule.id },
    });
    expect(deletedSchedule).toBeNull();
  });

  it('delete should throw an exception for an invalid schedule', async () => {
    const schedule: ScheduleEntity = schedulesList[0];
    await service.delete(schedule.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The schedule with the given id was not found',
    );
  });
});
