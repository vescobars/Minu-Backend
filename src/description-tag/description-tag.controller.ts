import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DescriptionTagDto } from './description-tag.dto';
import { DescriptionTagEntity } from './description-tag.entity';
import { DescriptionTagService } from './description-tag.service';
import { HasRoles } from '../shared/security/roles.decorators';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('description-tags')
@UseInterceptors(BusinessErrorsInterceptor)
export class DescriptionTagController {
    constructor(private readonly descriptionTagService: DescriptionTagService) {}
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll() {
    return await this.descriptionTagService.findAll();
    }
  
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':descriptionTagId')
    async findOne(@Param('descriptionTagId') descriptionTagId: string) {
        return await this.descriptionTagService.findOne(descriptionTagId);
    }
  
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() descriptionTagDto: DescriptionTagDto) {
        const descriptionTag: DescriptionTagEntity = plainToInstance(DescriptionTagEntity, descriptionTagDto);
        return await this.descriptionTagService.create(descriptionTag);
    }
  
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':descriptionTagId')
    async update(@Param('descriptionTagId') descriptionTagId: string, @Body() descriptionTagDto: DescriptionTagDto) {
        const descriptionTag: DescriptionTagEntity = plainToInstance(DescriptionTagEntity, descriptionTagDto);
        return await this.descriptionTagService.update(descriptionTagId, descriptionTag);
    }
  
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':descriptionTagId')
    @HttpCode(204)
    async delete(@Param('descriptionTagId') descriptionTagId: string) {
        return await this.descriptionTagService.delete(descriptionTagId);
    }
}
