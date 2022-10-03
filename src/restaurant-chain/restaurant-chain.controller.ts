import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantChainDto } from './restaurant-chain.dto';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantChainController {
    constructor(private readonly chainService:RestaurantChainService){}

    @Get()
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findAll() {
        return await this.chainService.findAll();
    }

    @Get(':chainId')
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOne(@Param('chainId') chainId: string) {
        return await this.chainService.findOne(chainId);
    }

    @Post()
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async create(@Body() chainDto: RestaurantChainDto) {
        const chain: RestaurantChainEntity = plainToInstance(RestaurantChainEntity, chainDto);
        return await this.chainService.create(chain);
    }

    @Put(':chainId')
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
        async update(@Param('chainId') chainId: string, @Body() chainDto: RestaurantChainDto) {
        const chain: RestaurantChainEntity = plainToInstance(RestaurantChainEntity, chainDto);
        return await this.chainService.update(chainId, chain);
    }

    @Delete(':chainId')
    @HttpCode(204)
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(@Param('chainId') chainId: string) {
        return await this.chainService.delete(chainId);
    }
}
