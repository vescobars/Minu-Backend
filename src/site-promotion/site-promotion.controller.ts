import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PromotionDto } from '../promotion/promotion.dto';
import { PromotionEntity } from '../promotion/promotion.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SitePromotionService } from './site-promotion.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SitePromotionController {
    constructor(private readonly sitePromotionService: SitePromotionService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/promotions/:promotionId')
  async find(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.sitePromotionService.findPromotionBySiteIdPromotionId(
      siteId,
      promotionId,
    );
  }
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/promotions')
  async findPromotionsBySiteId(@Param('siteId') siteId: string) {
    return await this.sitePromotionService.findPromotionsBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/promotions/:promotionId')
  async addPromotionSite(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.sitePromotionService.addPromotionSite(siteId, promotionId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)  
  @Put(':siteId/promotions')
  async associatePromotionsSite(
    @Body() promotionsDto: PromotionDto[],
    @Param('siteId') siteId: string,
  ) {
    const promotions = plainToInstance(PromotionEntity, promotionsDto);
    return await this.sitePromotionService.associatePromotionsSite(
      siteId,
      promotions,
    );
  }
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/promotions/:promotionId')
  @HttpCode(204)
  async deletePromotionSite(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.sitePromotionService.deletePromotionSite(siteId, promotionId);
  }
}
