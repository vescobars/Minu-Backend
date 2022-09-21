import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ScheduleDto } from './schedule.dto';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
@UseInterceptors(BusinessErrorsInterceptor)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async findAll() {
    return await this.scheduleService.findAll();
  }

  @Get(':scheduleId')
  async findOne(@Param('scheduleId') scheduleId: string) {
    return await this.scheduleService.findOne(scheduleId);
  }

  @Post()
  async create(@Body() scheduleDto: ScheduleDto) {
    const schedule: ScheduleEntity = plainToInstance(
      ScheduleEntity,
      scheduleDto,
    );
    return await this.scheduleService.create(schedule);
  }

  @Put(':scheduleId')
  async update(
    @Param('scheduleId') scheduleId: string,
    @Body() scheduleDto: ScheduleDto,
  ) {
    const schedule: ScheduleEntity = plainToInstance(
      ScheduleEntity,
      scheduleDto,
    );
    return await this.scheduleService.update(scheduleId, schedule);
  }

  @Delete(':scheduleId')
  @HttpCode(204)
  async delete(@Param('scheduleId') scheduleId: string) {
    return await this.scheduleService.delete(scheduleId);
  }
}
