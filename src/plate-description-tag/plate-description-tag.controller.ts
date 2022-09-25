import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DescriptionTagDto } from 'src/description-tag/description-tag.dto';
import { DescriptionTagEntity } from 'src/description-tag/description-tag.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PlateDescriptionTagService } from './plate-description-tag.service';

@Controller('plate')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlateDescriptionTagController {
   constructor(private readonly plateDescriptionTagService: PlateDescriptionTagService){}

   @Post(':plateId/descriptionTags/:descriptionTagsId')
   async addDescriptionTagPlate(@Param('plateId') plateId: string, @Param('descriptionTagsId') descriptionTagsId: string){
       return await this.plateDescriptionTagService.addDescriptionTagPlate(plateId, descriptionTagsId);
   }

   @Get(':plateId/descriptionTags/:descriptionTagId')
   async findDescriptionTagByPlateIdDescriptionTagId(@Param('plateId') plateId: string, @Param('descriptionTagId') descriptionTagsId: string){
       return await this.plateDescriptionTagService.findDescriptionTagByPlateIdDescriptionTagId(plateId, descriptionTagsId);
   }

   @Get(':plateId/descriptionTags')
   async findDescriptionTagsByPlateId(@Param('plateId') plateId: string){
       return await this.plateDescriptionTagService.findDescriptionTagsByPlateId(plateId);
   }

   @Put(':plateId/descriptionTags')
   async associateDescriptionTagsPlate(@Body() descriptionTagsDto: DescriptionTagDto[], @Param('plateId') plateId: string){
       const descriptionTags = plainToInstance(DescriptionTagEntity, descriptionTagsDto)
       return await this.plateDescriptionTagService.associateDescriptionTagsPlate(plateId, descriptionTags);
   }

   @Delete(':plateId/descriptionTags/:descriptionTagId')
   @HttpCode(204)
   async deleteDescriptionTagPlate(@Param('plateId') plateId: string, @Param('descriptionTagId') descriptionTagsId: string){
       return await this.plateDescriptionTagService.deleteDescriptionTagPlate(plateId, descriptionTagsId);
   }
}   

