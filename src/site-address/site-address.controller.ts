import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
//import { AddressDto } from '../address/address.dto';
import { AddressEntity } from '../address/address.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteAddressService } from './site-address.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteAddressController {
    constructor(private readonly SiteAddressService: SiteAddressService) {}

  @Get(':siteId/addresses')
  async findAddressBySiteId(@Param('siteId') siteId: string) {
    return await this.SiteAddressService.findAddressBySiteId(siteId);
  }

  @Post(':siteId/addresses/:addressId')
  async addAddressSite(
    @Param('siteId') siteId: string,
    @Param('addressId') addressId: string,
  ) {
    return await this.SiteAddressService.addAddressSite(siteId, addressId);
  }
  
 /*
 //Waiting for AddressDto implementation by penichejr
 @Put(':siteId/addresses')
  async associateAddressSite(
    @Body() addressDto: AddressDto,
    @Param('siteId') siteId: string,
  ) {
    const address = plainToInstance(AddressEntity, addressDto);
    return await this.SiteAddressService.associateAddressSite(
      siteId,
      address,
    );
  } */

  @Delete(':siteId/addresses/:addressId')
  @HttpCode(204)
  async deleteAddressSite(
    @Param('siteId') siteId: string,
    @Param('addressId') addressId: string,
  ) {
    return await this.SiteAddressService.deleteAddressSite(siteId, addressId);
  }
}
