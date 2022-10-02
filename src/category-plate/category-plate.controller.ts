import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlateDto } from '../plate/plate.dto';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoryPlateService } from './category-plate.service';

@Controller('categories')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoryPlateController {
   constructor(private readonly categoryPlateService: CategoryPlateService){}
  
   @UseGuards(JwtAuthGuard)
   @Post(':categoryId/plates/:plateId')
   async addPlateCategory(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.addPlateCategory(categoryId, plateId);
   }
  
   @UseGuards(JwtAuthGuard)
   @Get(':categoryId/plates/:plateId')
   async findPlateByCategoryIdPlateId(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.findPlateByCategoryIdPlateId(categoryId, plateId);
   }
  
   @UseGuards(JwtAuthGuard)
   @Get(':categoryId/plates')
   async findPlatesByCategoryId(@Param('categoryId') categoryId: string){
       return await this.categoryPlateService.findPlatesByCategoryId(categoryId);
   }
  
   @UseGuards(JwtAuthGuard)
   @Put(':categoryId/plates')
   async associatePlatesCategory(@Body() platesDto: PlateDto[], @Param('categoryId') categoryId: string){
       const plates = plainToInstance(PlateEntity, platesDto)
       return await this.categoryPlateService.associatePlatesCategory(categoryId, plates);
   }
  
   @UseGuards(JwtAuthGuard)
   @Delete(':categoryId/plates/:plateId')
   @HttpCode(204)
   async deletePlateCategory(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.deletePlateCategory(categoryId, plateId);
   }
}