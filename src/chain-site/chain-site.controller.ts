import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestaurantSiteDto } from '../restaurant-site/restaurant-site.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { RestaurantSiteEntity } from '../restaurant-site/restaurant-site.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ChainSiteService } from './chain-site.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class ChainSiteController {
    constructor(private readonly chainSiteService: ChainSiteService) {}


  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':chainId/sites')
  async findSitesByChainId(@Param('chainId') chainId: string) {
    return await this.chainSiteService.findSitesByChainId(chainId);
  }
  // @HasRoles(Role.Writer)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':chainId/sites/:siteId')
  async addSiteChain(
    @Param('chainId') chainId: string,
    @Param('siteId') siteId: string,
  ) {
    return await this.chainSiteService.addSiteChain(chainId, siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':chainId/sites/:siteId')
  @HttpCode(204)
  async deleteSiteChain(
    @Param('chainId') chainId: string,
    @Param('siteId') siteId: string,
  ) {
    return await this.chainSiteService.deleteSiteChain(chainId, siteId);
  }
}
