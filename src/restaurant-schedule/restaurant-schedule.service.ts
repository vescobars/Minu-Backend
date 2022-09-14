import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantScheduleService {
  constructor(
    @InjectRepository(RestaurantSiteEntity)
    private readonly restaurantRepository: Repository<RestaurantSiteEntity>,

    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async addScheduleRestaurant(
    restaurantId: string,
    scheduleId: string,
  ): Promise<RestaurantSiteEntity> {
    const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    if (!schedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const restaurant: RestaurantSiteEntity =
      await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['schedules', 'exhibitions'],
      });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    restaurant.schedules = [...restaurant.schedules, schedule];
    return await this.restaurantRepository.save(restaurant);
  }

  async findScheduleByRestaurantIdScheduleId(
    restaurantId: string,
    scheduleId: string,
  ): Promise<ScheduleEntity> {
    const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    if (!schedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const restaurant: RestaurantSiteEntity =
      await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['schedules'],
      });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const restaurantSchedule: ScheduleEntity = restaurant.schedules.find(
      (e) => e.id === schedule.id,
    );

    if (!restaurantSchedule)
      throw new BusinessLogicException(
        'The schedule with the given id is not associated to the restaurant',
        BusinessError.PRECONDITION_FAILED,
      );

    return restaurantSchedule;
  }

  async findSchedulesByRestaurantId(
    restaurantId: string,
  ): Promise<ScheduleEntity[]> {
    const restaurant: RestaurantSiteEntity =
      await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['schedules'],
      });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return restaurant.schedules;
  }

  async associateSchedulesRestaurant(
    restaurantId: string,
    schedules: ScheduleEntity[],
  ): Promise<RestaurantSiteEntity> {
    const restaurant: RestaurantSiteEntity =
      await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['schedules'],
      });

    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < schedules.length; i++) {
      const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
        where: { id: schedules[i].id },
      });
      if (!schedule)
        throw new BusinessLogicException(
          'The schedule with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    restaurant.schedules = schedules;
    return await this.restaurantRepository.save(restaurant);
  }

  async deleteScheduleRestaurant(restaurantId: string, scheduleId: string) {
    const schedule: ScheduleEntity = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
    if (!schedule)
      throw new BusinessLogicException(
        'The schedule with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const restaurant: RestaurantSiteEntity =
      await this.restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ['schedules'],
      });
    if (!restaurant)
      throw new BusinessLogicException(
        'The restaurant with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const restaurantSchedule: ScheduleEntity = restaurant.schedules.find(
      (e) => e.id === schedule.id,
    );

    if (!restaurantSchedule)
      throw new BusinessLogicException(
        'The schedule with the given id is not associated to the restaurant',
        BusinessError.PRECONDITION_FAILED,
      );

    restaurant.schedules = restaurant.schedules.filter(
      (e) => e.id !== scheduleId,
    );
    await this.restaurantRepository.save(restaurant);
  }
}
