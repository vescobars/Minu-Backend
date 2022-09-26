import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantSiteDto } from './restaurant-site.dto';
import { RestaurantSiteEntity } from './restaurant-site.entity';
import { RestaurantSiteService } from './restaurant-site.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantSiteController {
    constructor(private readonly siteService:RestaurantSiteService){}

    @Get()
    async findAll() {
        return await this.siteService.findAll();
    }

    @Get(':siteId')
    async findOne(@Param('siteId') siteId: string) {
        return await this.siteService.findOne(siteId);
    }

    @Post()
    async create(@Body() siteDto: RestaurantSiteDto) {
        const site: RestaurantSiteEntity = plainToInstance(RestaurantSiteEntity, siteDto);
        return await this.siteService.create(site);
    }

    @Put(':siteId')
        async update(@Param('siteId') siteId: string, @Body() siteDto: RestaurantSiteDto) {
        const site: RestaurantSiteEntity = plainToInstance(RestaurantSiteEntity, siteDto);
        return await this.siteService.update(siteId, site);
    }

    @Delete(':siteId')
    @HttpCode(204)
    async delete(@Param('siteId') siteId: string) {
        return await this.siteService.delete(siteId);
    }
}
