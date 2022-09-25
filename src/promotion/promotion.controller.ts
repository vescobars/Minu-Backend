import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PromotionService } from '../promotion/promotion.service';
import { PromotionEntity } from '../promotion/promotion.entity';
import { PromotionDto } from '../promotion/promotion.dto';

@Controller('promotions')
@UseInterceptors(BusinessErrorsInterceptor)
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}

    @Get()
    async findAll() {
      return await this.promotionService.findAll();
    }
  
    @Get(':reviewId')
    async findOne(@Param('reviewId') reviewId: string) {
      return await this.promotionService.findOne(reviewId);
    }
  
    @Post()
    async create(@Body() reviewDto: PromotionDto) {
      const review: PromotionEntity = plainToInstance(PromotionEntity, reviewDto);
      return await this.promotionService.create(review);
    }
  
    @Put(':reviewId')
    async update(@Param('reviewId') reviewId: string, @Body() reviewDto: PromotionDto) {
      const review: PromotionEntity = plainToInstance(PromotionEntity, reviewDto);
      return await this.promotionService.update(reviewId, review);
    }
  
    @Delete(':reviewId')
    @HttpCode(204)
    async delete(@Param('reviewId') reviewId: string) {
      return await this.promotionService.delete(reviewId);
    }
}
