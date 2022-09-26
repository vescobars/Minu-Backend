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
import { ScheduleDto } from 'src/schedule/schedule.dto';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteScheduleService } from './site-schedule.service';

@Controller('restaurantSites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteScheduleController {
  constructor(private readonly siteScheduleService: SiteScheduleService) {}

  @Get(':siteId/schedules/:scheduleId')
  async findOrderByClientIdOrderId(
    @Param('siteId') siteId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    return await this.siteScheduleService.findScheduleBySiteIdScheduleId(
      siteId,
      scheduleId,
    );
  }

  @Get(':siteId/schedules')
  async findOrdersByClientId(@Param('siteId') siteId: string) {
    return await this.siteScheduleService.findSchedulesBySiteId(siteId);
  }

  @Post(':siteId/schedules/:scheduleId')
  async addOrderClient(
    @Param('siteId') siteId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    return await this.siteScheduleService.addScheduleSite(siteId, scheduleId);
  }

  @Put(':siteId/schedules')
  async associateOrdersClient(
    @Body() schedulesDto: ScheduleDto[],
    @Param('siteId') siteId: string,
  ) {
    const schedules = plainToInstance(ScheduleEntity, schedulesDto);
    return await this.siteScheduleService.associateSchedulesSite(
      siteId,
      schedules,
    );
  }

  @Delete(':siteId/schedules/:scheduleId')
  @HttpCode(204)
  async deleteOrderClient(
    @Param('siteId') siteId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    return await this.siteScheduleService.deleteScheduleSite(
      siteId,
      scheduleId,
    );
  }
}
