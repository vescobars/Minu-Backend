import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PlateDto } from './plate.dto';
import { PlateEntity } from './plate.entity';
import { PlateService } from './plate.service';

@Controller('plates')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlateController {
    constructor(private readonly plateService: PlateService) {}

    @Get()
    async findAll(){
        return await this.plateService.findAll();
    }

    @Get(':plateId')
    async findOne(@Param('plateId') plateId: string) {
      return await this.plateService.findOne(plateId);
    }

    @Post()
    async create(@Body() plateDto: PlateDto) {
      const plate: PlateEntity = plainToInstance(PlateEntity, plateDto);
      return await this.plateService.create(plate);
    }

    @Put(':plateId')
    async update(@Param('plateId') plateId: string, @Body() plateDto: PlateDto) {
    const plate: PlateEntity = plainToInstance(PlateEntity, plateDto);
    return await this.plateService.update(plateId, plate);
    }

    @Delete(':plateId')
    @HttpCode(204)
    async delete(@Param('plateId') plateId: string) {
    return await this.plateService.delete(plateId);
    }
}


