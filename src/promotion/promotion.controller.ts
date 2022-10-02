import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PromotionService } from '../promotion/promotion.service';
import { PromotionEntity } from '../promotion/promotion.entity';
import { PromotionDto } from '../promotion/promotion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('promotions')
@UseInterceptors(BusinessErrorsInterceptor)
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
      return await this.promotionService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get(':promotionId')
    async findOne(@Param('promotionId') promotionId: string) {
      return await this.promotionService.findOne(promotionId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() promotionDto: PromotionDto) {
      const promotion: PromotionEntity = plainToInstance(PromotionEntity, promotionDto);
      promotion.startDate = new Date(promotion.startDate);
      promotion.endDate = new Date(promotion.endDate);
      return await this.promotionService.create(promotion);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':promotionId')
    async update(@Param('promotionId') promotionId: string, @Body() promotionDto: PromotionDto) {
      const promotion: PromotionEntity = plainToInstance(PromotionEntity, promotionDto);
      promotion.startDate = new Date(promotion.startDate);
      promotion.endDate = new Date(promotion.endDate);
      return await this.promotionService.update(promotionId, promotion);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':promotionId')
    @HttpCode(204)
    async delete(@Param('promotionId') promotionId: string) {
      return await this.promotionService.delete(promotionId);
    }
}
