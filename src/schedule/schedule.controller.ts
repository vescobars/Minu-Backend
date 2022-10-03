import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { HasRoles } from '../shared/security/roles.decorators';
import { ScheduleDto } from './schedule.dto';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
@UseInterceptors(BusinessErrorsInterceptor)
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.scheduleService.findAll();
  }

  @Get(':scheduleId')
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('scheduleId') scheduleId: string) {
    return await this.scheduleService.findOne(scheduleId);
  }

  @Post()
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() scheduleDto: ScheduleDto) {
    const schedule: ScheduleEntity = plainToInstance(
      ScheduleEntity,
      scheduleDto,
    );
    return await this.scheduleService.create(schedule);
  }

  @Put(':scheduleId')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('scheduleId') scheduleId: string) {
    return await this.scheduleService.delete(scheduleId);
  }
}
