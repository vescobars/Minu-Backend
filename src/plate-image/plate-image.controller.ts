import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { PlateImageService } from './plate-image.service';
import { ImageEntity } from '../image/image.entity';
import { ImageDto } from '../image/image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plates')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlateImageController {
    constructor(private readonly plateImageService: PlateImageService){}

      
   @UseGuards(JwtAuthGuard)
   @Post(':plateId/images/:imageId')
   async addImagePlate(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.addImagePlate(plateId, imageId);
   }
  
   @UseGuards(JwtAuthGuard)
   @Get(':plateId/images/:imageId')
   async findImageByPlateIdImageId(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.findImageByPlateIdImageId(plateId, imageId);
   }

   @UseGuards(JwtAuthGuard)
   @Get(':plateId/images')
   async findImagesByPlateId(@Param('plateId') plateId: string){
       return await this.plateImageService.findImagesByPlateId(plateId);
   }
  
   @UseGuards(JwtAuthGuard)
   @Put(':plateId/images')
   async associateImagesPlate(@Body() imagesDto: ImageDto[], @Param('plateId') plateId: string){
       const images = plainToInstance(ImageEntity, imagesDto)
       return await this.plateImageService.associateImagesPlate(plateId, images);
   }
  
   @UseGuards(JwtAuthGuard)
   @Delete(':plateId/images/:imageId')
   @HttpCode(204)
   async deleteImagePlate(@Param('plateId') plateId: string, @Param('imageId') imageId: string){
       return await this.plateImageService.deleteImagePlate(plateId, imageId);
   }
}
