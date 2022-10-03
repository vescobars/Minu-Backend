import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { PlateImageService } from './plate-image.service';
import { ImageEntity } from '../image/image.entity';
import { ImageDto } from '../image/image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';

@Controller('plates')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlateImageController {
    constructor(private readonly plateImageService: PlateImageService){}

      
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Post(':plateId/images/:imageId')
   async addImagePlate(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.addImagePlate(plateId, imageId);
   }
  
   @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Get(':plateId/images/:imageId')
   async findImageByPlateIdImageId(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.findImageByPlateIdImageId(plateId, imageId);
   }

   @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Get(':plateId/images')
   async findImagesByPlateId(@Param('plateId') plateId: string){
       return await this.plateImageService.findImagesByPlateId(plateId);
   }
  
   @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Put(':plateId/images')
   async associateImagesPlate(@Body() imagesDto: ImageDto[], @Param('plateId') plateId: string){
       const images = plainToInstance(ImageEntity, imagesDto)
       return await this.plateImageService.associateImagesPlate(plateId, images);
   }
  
   @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
   @Delete(':plateId/images/:imageId')
   @HttpCode(204)
   async deleteImagePlate(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.deleteImagePlate(plateId, imageId);
   }
}
