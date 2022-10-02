import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from './../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findAll(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      relations: ['restaurantSite'],
    });
  }

  async findOne(id: string): Promise<ScheduleEntity> {
    const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['restaurantSite'],
    });
    if (!schedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return schedule;
  }

  async create(schedule: ScheduleEntity): Promise<ScheduleEntity> {
    return await this.scheduleRepository.save(schedule);
  }

  async update(id: string, schedule: ScheduleEntity): Promise<ScheduleEntity> {
    const persistedSchedule: ScheduleEntity =
      await this.scheduleRepository.findOne({ where: { id } });
    if (!persistedSchedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    schedule.id = id;

    return await this.scheduleRepository.save(schedule);
  }

  async delete(id: string) {
    const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
      where: { id },
    });
    if (!schedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.scheduleRepository.remove(schedule);
  }
}
