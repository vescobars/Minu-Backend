import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MenuVisualPreferencesDto } from './menu-visual-preferences.dto';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';
import { MenuVisualPreferencesService } from './menu-visual-preferences.service';

@Controller('preferences')
@UseInterceptors(BusinessErrorsInterceptor)
export class MenuVisualPreferencesController {
    constructor(private readonly preferencesService:MenuVisualPreferencesService){}

    @Get()
    async findAll() {
        return await this.preferencesService.findAll();
    }

    @Get(':preferencesId')
    async findOne(@Param('preferencesId') preferencesId: string) {
        return await this.preferencesService.findOne(preferencesId);
    }

    @Post()
    async create(@Body() preferencesDto: MenuVisualPreferencesDto) {
        const preferences: MenuVisualPreferenceEntity = plainToInstance(MenuVisualPreferenceEntity, preferencesDto);
        return await this.preferencesService.create(preferences);
    }

    @Put(':preferencesId')
        async update(@Param('preferencesId') preferencesId: string, @Body() preferencesDto: MenuVisualPreferencesDto) {
        const preferences: MenuVisualPreferenceEntity = plainToInstance(MenuVisualPreferenceEntity, preferencesDto);
        return await this.preferencesService.update(preferencesId, preferences);
    }

    @Delete(':preferencesId')
    @HttpCode(204)
    async delete(@Param('preferencesId') preferencesId: string) {
        return await this.preferencesService.delete(preferencesId);
    }
}
