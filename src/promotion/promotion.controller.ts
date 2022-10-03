import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PromotionService } from '../promotion/promotion.service';
import { PromotionEntity } from '../promotion/promotion.entity';
import { PromotionDto } from '../promotion/promotion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';

@Controller('promotions')
@UseInterceptors(BusinessErrorsInterceptor)
export class PromotionController {
    constructor(private readonly promotionService: PromotionService) {}
  
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll() {
      return await this.promotionService.findAll();
    }
    
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':promotionId')
    async findOne(@Param('promotionId') promotionId: string) {
      return await this.promotionService.findOne(promotionId);
    }
    
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() promotionDto: PromotionDto) {
      const promotion: PromotionEntity = plainToInstance(PromotionEntity, promotionDto);
      promotion.startDate = new Date(promotion.startDate);
      promotion.endDate = new Date(promotion.endDate);
      return await this.promotionService.create(promotion);
    }

    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':promotionId')
    async update(@Param('promotionId') promotionId: string, @Body() promotionDto: PromotionDto) {
      const promotion: PromotionEntity = plainToInstance(PromotionEntity, promotionDto);
      promotion.startDate = new Date(promotion.startDate);
      promotion.endDate = new Date(promotion.endDate);
      return await this.promotionService.update(promotionId, promotion);
    }
  
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':promotionId')
    @HttpCode(204)
    async delete(@Param('promotionId') promotionId: string) {
      return await this.promotionService.delete(promotionId);
    }
}
