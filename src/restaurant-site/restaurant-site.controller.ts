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
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantSiteDto } from './restaurant-site.dto';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantSiteController {
  constructor(private readonly siteService: RestaurantSiteService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.siteService.findAll();
  }

  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId')
  async findOne(@Param('siteId') siteId: string) {
    return await this.siteService.findOne(siteId);
  }

  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() siteDto: RestaurantSiteDto) {
    const site: RestaurantSiteEntity = plainToInstance(
      RestaurantSiteEntity,
      siteDto,
    );
    return await this.siteService.create(site);
  }

  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':siteId')
  async update(
    @Param('siteId') siteId: string,
    @Body() siteDto: RestaurantSiteDto,
  ) {
    const site: RestaurantSiteEntity = plainToInstance(
      RestaurantSiteEntity,
      siteDto,
    );
    return await this.siteService.update(siteId, site);
  }

  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId')
  @HttpCode(204)
  async delete(@Param('siteId') siteId: string) {
    return await this.siteService.delete(siteId);
  }
}
