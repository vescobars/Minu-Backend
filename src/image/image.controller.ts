import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { ImageDto } from './image.dto';
import { ImageEntity } from './image.entity';
import { ImageService } from './image.service';

@Controller('images')
@UseInterceptors(BusinessErrorsInterceptor)
export class ImageController {
    constructor(private readonly imageService:ImageService){}

    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll() {
        return await this.imageService.findAll();
    }

    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':imageId')
    async findOne(@Param('imageId') imageId: string) {
        return await this.imageService.findOne(imageId);
    }

    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() imageDto: ImageDto) {
        const image: ImageEntity = plainToInstance(ImageEntity, imageDto);
        return await this.imageService.create(image);
    }

    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':imageId')
        async update(@Param('imageId') imageId: string, @Body() imageDto: ImageDto) {
        const image: ImageEntity = plainToInstance(ImageEntity, imageDto);
        return await this.imageService.update(imageId, image);
    }

    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':imageId')
    @HttpCode(204)
    async delete(@Param('imageId') imageId: string) {
        return await this.imageService.delete(imageId);
    }
}
