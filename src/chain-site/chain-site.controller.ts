import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestaurantSiteDto } from '../restaurant-site/restaurant-site.dto';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ChainSiteService } from './chain-site.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class ChainSiteController {
    constructor(private readonly chainSiteService: ChainSiteService) {}

  @Get(':chainId/sites/:siteId')
  async findSiteByChainIdSiteId(
    @Param('chainId') chainId: string,
    @Param('siteId') siteId: string,
  ) {
    return await this.chainSiteService.findSiteByChainIdSiteId(
      chainId,
      siteId,
    );
  }

  @Get(':chainId/sites')
  async findSitesByChainId(@Param('chainId') chainId: string) {
    return await this.chainSiteService.findSitesByChainId(chainId);
  }

  @Post(':chainId/sites/:siteId')
  async addSiteChain(
    @Param('chainId') chainId: string,
    @Param('siteId') siteId: string,
  ) {
    return await this.chainSiteService.addSiteChain(chainId, siteId);
  }

  @Put(':chainId/sites')
  async associateSitesChain(
    @Body() sitesDto: RestaurantSiteDto[],
    @Param('chainId') chainId: string,
  ) {
    const sites = plainToInstance(RestaurantSiteEntity, sitesDto);
    return await this.chainSiteService.associateSitesChain(
      chainId,
      sites,
    );
  }

  @Delete(':chainId/sites/:siteId')
  @HttpCode(204)
  async deleteSiteChain(
    @Param('chainId') chainId: string,
    @Param('siteId') siteId: string,
  ) {
    return await this.chainSiteService.deleteSiteChain(chainId, siteId);
  }
}
