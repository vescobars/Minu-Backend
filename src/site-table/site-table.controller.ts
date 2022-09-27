import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TableDto } from '../table/table.dto';
import { TableEntity } from '../table/table.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteTableService } from './site-table.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteTableController {
    constructor(private readonly siteTableService: SiteTableService) {}

  @Get(':siteId/tables/:tableId')
  async findTableBySiteIdTableId(
    @Param('siteId') siteId: string,
    @Param('tableId') tableId: string,
  ) {
    return await this.siteTableService.findTableBySiteIdTableId(
      siteId,
      tableId,
    );
  }

  @Get(':siteId/tables')
  async findTablesBySiteId(@Param('siteId') siteId: string) {
    return await this.siteTableService.findTablesBySiteId(siteId);
  }

  @Post(':siteId/tables/:tableId')
  async addTableSite(
    @Param('siteId') siteId: string,
    @Param('tableId') tableId: string,
  ) {
    return await this.siteTableService.addTableSite(siteId, tableId);
  }
  
 @Put(':siteId/tables')
  async associateTablesSite(
    @Body() tablesDto: TableDto[],
    @Param('siteId') siteId: string,
  ) {
    const tables = plainToInstance(TableEntity, tablesDto);
    return await this.siteTableService.associateTablesSite(
      siteId,
      tables,
    );
  }

  @Delete(':siteId/tables/:tableId')
  @HttpCode(204)
  async deleteTableSite(
    @Param('siteId') siteId: string,
    @Param('tableId') tableId: string,
  ) {
    return await this.siteTableService.deleteTableSite(siteId, tableId);
  }
}
