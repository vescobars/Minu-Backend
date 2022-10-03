import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HasRoles, Roles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TableDto } from './table.dto';
import { TableEntity } from './table.entity';
import { TableService } from './table.service';
import { Role } from '../enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@Controller('tables')
@UseInterceptors(BusinessErrorsInterceptor)
export class TableController {
    constructor(private readonly tableService:TableService){}
    
    @Get()
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAll() {
        return await this.tableService.findAll();
    }

    
    @Get(':tableId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Param('tableId') tableId: string) {
        return await this.tableService.findOne(tableId);
    }
    
    @Post()
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() tableDto: TableDto) {
        const table: TableEntity = plainToInstance(TableEntity, tableDto);
        return await this.tableService.create(table);
    }

    
    @Put(':tableId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async update(@Param('tableId') tableId: string, @Body() tableDto: TableDto) {
        const table: TableEntity = plainToInstance(TableEntity, tableDto);
        return await this.tableService.update(tableId, table);
    }

    
    @Delete(':tableId')
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(204)
    async delete(@Param('tableId') tableId: string) {
        return await this.tableService.delete(tableId);
    }
}
