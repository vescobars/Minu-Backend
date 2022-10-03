import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AddressDto } from '../address/address.dto';
import { AddressEntity } from '../address/address.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteAddressService } from './site-address.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteAddressController {
    constructor(private readonly siteAddressService: SiteAddressService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/addresses')
  async findAddressBySiteId(@Param('siteId') siteId: string) {
    return await this.siteAddressService.findAddressBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/addresses/:addressId')
  async addAddressSite(
    @Param('siteId') siteId: string,
    @Param('addressId') addressId: string,
  ) {
    return await this.siteAddressService.addAddressSite(siteId, addressId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':siteId/addresses')
  async associateAddressSite(
    @Body() addressDto: AddressDto,
    @Param('siteId') siteId: string,
  ) {
    const address = plainToInstance(AddressEntity, addressDto);
    return await this.siteAddressService.associateAddressSite(
      siteId,
      address,
    );
  }
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/addresses/:addressId')
  @HttpCode(204)
  async deleteAddressSite(
    @Param('siteId') siteId: string,
    @Param('addressId') addressId: string,
  ) {
    return await this.siteAddressService.deleteAddressSite(siteId, addressId);
  }
}
