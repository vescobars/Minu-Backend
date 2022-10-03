import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestaurantOperatorDto } from '../restaurant-operator/restaurant-operator.dto';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteOperatorService } from './site-operator.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteOperatorController {
    constructor(private readonly siteOperatorService: SiteOperatorService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/operators/:operatorId')
  async findOperatorBySiteIdOperatorId(
    @Param('siteId') siteId: string,
    @Param('operatorId') operatorId: string,
  ) {
    return await this.siteOperatorService.findOperatorBySiteIdOperatorId(
      siteId,
      operatorId,
    );
  }
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/operators')
  async findOperatorsBySiteId(@Param('siteId') siteId: string) {
    return await this.siteOperatorService.findOperatorsBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/operators/:operatorId')
  async addOperatorSite(
    @Param('siteId') siteId: string,
    @Param('operatorId') operatorId: string,
  ) {
    return await this.siteOperatorService.addOperatorSite(siteId, operatorId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':siteId/operators')
  async associateOperatorsSite(
    @Body() operatorsDto: RestaurantOperatorDto[],
    @Param('siteId') siteId: string,
  ) {
    const operators = plainToInstance(RestaurantOperatorEntity, operatorsDto);
    return await this.siteOperatorService.associateOperatorsSite(
      siteId,
      operators,
    );
  }
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/operators/:operatorId')
  @HttpCode(204)
  async deleteOperatorSite(
    @Param('siteId') siteId: string,
    @Param('operatorId') operatorId: string,
  ) {
    return await this.siteOperatorService.deleteOperatorSite(siteId, operatorId);
  }
}
