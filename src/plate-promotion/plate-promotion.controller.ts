import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { PromotionDto } from '../promotion/promotion.dto';
import { PromotionEntity } from '../promotion/promotion.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PlatePromotionService } from './plate-promotion.service';

@Controller('plates')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlatePromotionController {

    constructor(private readonly platePromotionService: PlatePromotionService){}

    @Get(':plateId/promotions')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findPromotionByPlateId(@Param('plateId') plateId: string) {
      return await this.platePromotionService.findPromotionByPlateId(plateId);
    }
  
    @Post(':plateId/promotions/:promotionId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async addPromotionPlate(
      @Param('plateId') plateId: string,
      @Param('promotionId') promotionId: string,
    ) {
      return await this.platePromotionService.addPromotionPlate(plateId, promotionId);
    }
    
   @Put(':plateId/promotions')
   @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async associatePromotionPlate(
      @Body() PromotionDto: PromotionDto,
      @Param('plateId') plateId: string,
    ) {
      const promotion = plainToInstance(PromotionEntity, PromotionDto);
      return await this.platePromotionService.associatePromotionPlate(
        plateId,
        promotion,
      );
    }
  
    @Delete(':plateId/promotions/:promotionId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async deletePromotionPlate(
      @Param('plateId') plateId: string,
      @Param('promotionId') promotionId: string,
    ) {
      return await this.platePromotionService.deletePromotionPlate(plateId, promotionId);
    }
  
}
