import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PromotionDto } from '../promotion/promotion.dto';
import { PromotionEntity } from '../promotion/promotion.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PlatePromotionService } from './plate-promotion.service';

@Controller('plate')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlatePromotionController {

    constructor(private readonly platePromotionService: PlatePromotionService){}

    /**
   @Post(':plateId/promotions/:promotionId')
   async addPromotionPlate(@Param('plateId') plateId: string, @Param('promotionId') promotionId: string){
       return await this.platePromotionService.addPromotionPlate(plateId, promotionId);
   }

   @Get(':plateId/promotions/:promotionId')
   async findPromotionByPlateIdPromotionId(@Param('plateId') plateId: string, @Param('promotionId') promotionId: string){
       return await this.platePromotionService.getPromotionByPlateId(plateId, promotionId);
   }

   @Put(':plateId/promotions')
   async associatePromotionsPlate(@Body() promotionsDto: PromotionDto[], @Param('plateId') plateId: string){
       const promotions = plainToInstance(PromotionEntity, promotionsDto)
       return await this.platePromotionService.associatePromotionsPlate(plateId, promotions);
   }

   @Delete(':plateId/promotions/:promotionId')
   @HttpCode(204)
   async deletePromotionPlate(@Param('plateId') plateId: string, @Param('promotionId') promotionId: string){
       return await this.platePromotionService.deletePromotionPlate(plateId, promotionId);
   }
   */
}
