import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestaurantChainDto } from './restaurant-chain.dto';
import { RestaurantChainEntity } from './restaurant-chain.entity';
import { RestaurantChainService } from './restaurant-chain.service';

@Controller('chains')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantChainController {
    constructor(private readonly chainService:RestaurantChainService){}

    @Get()
    async findAll() {
        return await this.chainService.findAll();
    }

    @Get(':chainId')
    async findOne(@Param('chainId') chainId: string) {
        return await this.chainService.findOne(chainId);
    }

    @Post()
    async create(@Body() chainDto: RestaurantChainDto) {
        const chain: RestaurantChainEntity = plainToInstance(RestaurantChainEntity, chainDto);
        return await this.chainService.create(chain);
    }

    @Put(':chainId')
        async update(@Param('chainId') chainId: string, @Body() chainDto: RestaurantChainDto) {
        const chain: RestaurantChainEntity = plainToInstance(RestaurantChainEntity, chainDto);
        return await this.chainService.update(chainId, chain);
    }

    @Delete(':chainId')
    @HttpCode(204)
    async delete(@Param('chainId') chainId: string) {
        return await this.chainService.delete(chainId);
    }
}
