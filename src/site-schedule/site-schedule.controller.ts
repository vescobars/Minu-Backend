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
import { ScheduleDto } from 'src/schedule/schedule.dto';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { HasRoles } from '../shared/security/roles.decorators';
import { SiteScheduleService } from './site-schedule.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteScheduleController {
  constructor(private readonly siteScheduleService: SiteScheduleService) {}

  @Get(':siteId/schedules/:scheduleId')
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOrdersByClientId(@Param('siteId') siteId: string) {
    return await this.siteScheduleService.findSchedulesBySiteId(siteId);
  }

  @Post(':siteId/schedules/:scheduleId')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addOrderClient(
    @Param('siteId') siteId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    return await this.siteScheduleService.addScheduleSite(siteId, scheduleId);
  }

  @Put(':siteId/schedules')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
