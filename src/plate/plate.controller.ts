import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PlateDto } from './plate.dto';
import { PlateEntity } from './plate.entity';
import { PlateService } from './plate.service';

@Controller('plates')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlateController {
    constructor(private readonly plateService: PlateService) {}
  
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll(){
        return await this.plateService.findAll();
    }
  
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':plateId')
    async findOne(@Param('plateId') plateId: string) {
      return await this.plateService.findOne(plateId);
    }
  
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() plateDto: PlateDto) {
      const plate: PlateEntity = plainToInstance(PlateEntity, plateDto);
      return await this.plateService.create(plate);
    }
  
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':plateId')
    async update(@Param('plateId') plateId: string, @Body() plateDto: PlateDto) {
    const plate: PlateEntity = plainToInstance(PlateEntity, plateDto);
    return await this.plateService.update(plateId, plate);
    }
  
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':plateId')
    @HttpCode(204)
    async delete(@Param('plateId') plateId: string) {
    return await this.plateService.delete(plateId);
    }
}


