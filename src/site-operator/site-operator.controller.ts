import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestaurantOperatorDto } from '../restaurant-operator/restaurant-operator.dto';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteOperatorService } from './site-operator.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteOperatorController {
    constructor(private readonly siteOperatorService: SiteOperatorService) {}

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

  @Get(':siteId/operators')
  async findOperatorsBySiteId(@Param('siteId') siteId: string) {
    return await this.siteOperatorService.findOperatorsBySiteId(siteId);
  }

  @Post(':siteId/operators/:operatorId')
  async addOperatorSite(
    @Param('siteId') siteId: string,
    @Param('operatorId') operatorId: string,
  ) {
    return await this.siteOperatorService.addOperatorSite(siteId, operatorId);
  }

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

  @Delete(':siteId/operators/:operatorId')
  @HttpCode(204)
  async deleteOperatorSite(
    @Param('siteId') siteId: string,
    @Param('operatorId') operatorId: string,
  ) {
    return await this.siteOperatorService.deleteOperatorSite(siteId, operatorId);
  }
}
