import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClientDto } from './client.dto';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

@Controller('client')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientController {
    constructor(private readonly clientService:ClientService){}

    @Get()
    async findAll() {
        return await this.clientService.findAll();
    }

    @Get(':clientId')
    async findOne(@Param('clientId') clientId: string) {
        return await this.clientService.findOne(clientId);
    }

    @Post()
    async create(@Body() clientDto: ClientDto) {
        const museum: ClientEntity = plainToInstance(ClientEntity, clientDto);
        return await this.clientService.create(museum);
    }

    @Put(':clientId')
    async update(@Param('clientId') clientId: string, @Body() clientDto: ClientDto) {
        const museum: ClientEntity = plainToInstance(ClientEntity, clientDto);
        return await this.clientService.update(clientId, museum);
    }

    @Delete(':clientId')
    @HttpCode(204)
    async delete(@Param('clientId') clientId: string) {
        return await this.clientService.delete(clientId);
    }
}
