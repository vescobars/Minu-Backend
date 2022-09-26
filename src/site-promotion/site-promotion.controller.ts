import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
//import { PromotionDto } from '../promotion/promotion.dto';
import { PromotionEntity } from '../promotion/promotion.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SitePromotionService } from './site-promotion.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SitePromotionController {
    constructor(private readonly SitePromotionService: SitePromotionService) {}

  @Get(':siteId/promotions/:promotionId')
  async find(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.SitePromotionService.findPromotionBySiteIdPromotionId(
      siteId,
      promotionId,
    );
  }

  @Get(':siteId/promotions')
  async findPromotionsBySiteId(@Param('siteId') siteId: string) {
    return await this.SitePromotionService.findPromotionsBySiteId(siteId);
  }

  @Post(':siteId/promotions/:promotionId')
  async addPromotionSite(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.SitePromotionService.addPromotionSite(siteId, promotionId);
  }
  
 /*
 //Waiting for promotionDto implementation by gcagua 
 @Put(':siteId/promotions')
  async associatePromotionsSite(
    @Body() promotionsDto: PromotionDto[],
    @Param('siteId') siteId: string,
  ) {
    const promotions = plainToInstance(PromotionEntity, promotionsDto);
    return await this.SitePromotionService.associatePromotionsSite(
      siteId,
      promotions,
    );
  } */

  @Delete(':siteId/promotions/:promotionId')
  @HttpCode(204)
  async deletePromotionSite(
    @Param('siteId') siteId: string,
    @Param('promotionId') promotionId: string,
  ) {
    return await this.SitePromotionService.deletePromotionSite(siteId, promotionId);
  }
}