import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PlateDto } from '../plate/plate.dto';
import { PlateEntity } from '../plate/plate.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoryPlateService } from './category-plate.service';
import { HasRoles } from '../shared/security/roles.decorators';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('categories')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoryPlateController {
   constructor(private readonly categoryPlateService: CategoryPlateService){}
  
   @HasRoles(Role.Writer)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Post(':categoryId/plates/:plateId')
   async addPlateCategory(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.addPlateCategory(categoryId, plateId);
   }
  
   @HasRoles(Role.Reader)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Get(':categoryId/plates/:plateId')
   async findPlateByCategoryIdPlateId(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.findPlateByCategoryIdPlateId(categoryId, plateId);
   }
  
   @HasRoles(Role.Reader)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Get(':categoryId/plates')
   async findPlatesByCategoryId(@Param('categoryId') categoryId: string){
       return await this.categoryPlateService.findPlatesByCategoryId(categoryId);
   }
  
   @HasRoles(Role.Writer)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Put(':categoryId/plates')
   async associatePlatesCategory(@Body() platesDto: PlateDto[], @Param('categoryId') categoryId: string){
       const plates = plainToInstance(PlateEntity, platesDto)
       return await this.categoryPlateService.associatePlatesCategory(categoryId, plates);
   }
  
   @HasRoles(Role.Deleter)
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Delete(':categoryId/plates/:plateId')
   @HttpCode(204)
   async deletePlateCategory(@Param('categoryId') categoryId: string, @Param('plateId') plateId: string){
       return await this.categoryPlateService.deletePlateCategory(categoryId, plateId);
   }
}