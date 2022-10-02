import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DescriptionTagDto } from './description-tag.dto';
import { DescriptionTagEntity } from './description-tag.entity';
import { DescriptionTagService } from './description-tag.service';

@Controller('description-tags')
@UseInterceptors(BusinessErrorsInterceptor)
export class DescriptionTagController {
    constructor(private readonly descriptionTagService: DescriptionTagService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
    return await this.descriptionTagService.findAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':descriptionTagId')
    async findOne(@Param('descriptionTagId') descriptionTagId: string) {
        return await this.descriptionTagService.findOne(descriptionTagId);
    }

    @Post()
    async create(@Body() descriptionTagDto: DescriptionTagDto) {
        const descriptionTag: DescriptionTagEntity = plainToInstance(DescriptionTagEntity, descriptionTagDto);
        return await this.descriptionTagService.create(descriptionTag);
    }

    @Put(':descriptionTagId')
    async update(@Param('descriptionTagId') descriptionTagId: string, @Body() descriptionTagDto: DescriptionTagDto) {
        const descriptionTag: DescriptionTagEntity = plainToInstance(DescriptionTagEntity, descriptionTagDto);
        return await this.descriptionTagService.update(descriptionTagId, descriptionTag);
    }

    @Delete(':descriptionTagId')
    @HttpCode(204)
    async delete(@Param('descriptionTagId') descriptionTagId: string) {
        return await this.descriptionTagService.delete(descriptionTagId);
    }
}
