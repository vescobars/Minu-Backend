import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { TableDto } from './table.dto';
import { TableEntity } from './table.entity';
import { TableService } from './table.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class TableController {
    constructor(private readonly tableService:TableService){}
    
    @Get(':chainId/sites/:siteId/tables')
    async findAll() {
        return await this.tableService.findAll();
    }

    @Get(':chainId/sites/:siteId/tables/:tableId')
    async findOne(@Param('tableId') tableId: string) {
        return await this.tableService.findOne(tableId);
    }

    @Post(':chainId/sites/:siteId/tables')
    async create(@Body() tableDto: TableDto) {
        const table: TableEntity = plainToInstance(TableEntity, tableDto);
        return await this.tableService.create(table);
    }

    @Put(':chainId/sites/:siteId/tables/:tableId')
    async update(@Param('tableId') tableId: string, @Body() tableDto: TableDto) {
        const table: TableEntity = plainToInstance(TableEntity, tableDto);
        return await this.tableService.update(tableId, table);
    }

    @Delete(':chainId/sites/:siteId/tables/:tableId')
    @HttpCode(204)
    async delete(@Param('tableId') tableId: string) {
        return await this.tableService.delete(tableId);
    }
}
