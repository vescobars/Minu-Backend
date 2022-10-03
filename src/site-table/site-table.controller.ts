import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TableDto } from '../table/table.dto';
import { TableEntity } from '../table/table.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteTableService } from './site-table.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteTableController {
    constructor(private readonly siteTableService: SiteTableService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/tables')
  async findTablesBySiteId(@Param('siteId') siteId: string) {
    return await this.siteTableService.findTablesBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/tables/:tableId')
  async addTableSite(
    @Param('siteId') siteId: string,
    @Param('tableId') tableId: string,
  ) {
    return await this.siteTableService.addTableSite(siteId, tableId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard) 
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/tables/:tableId')
  @HttpCode(204)
  async deleteTableSite(
    @Param('siteId') siteId: string,
    @Param('tableId') tableId: string,
  ) {
    return await this.siteTableService.deleteTableSite(siteId, tableId);
  }
}
