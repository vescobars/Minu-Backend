import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { HasRoles } from '../shared/security/roles.decorators';
import { ClientDto } from './client.dto';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':clientId')
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('clientId') clientId: string) {
    return await this.clientService.findOne(clientId);
  }

  @Post()
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() clientDto: ClientDto) {
    const museum: ClientEntity = plainToInstance(ClientEntity, clientDto);
    return await this.clientService.create(museum);
  }

  @Put(':clientId')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(
    @Param('clientId') clientId: string,
    @Body() clientDto: ClientDto,
  ) {
    const museum: ClientEntity = plainToInstance(ClientEntity, clientDto);
    return await this.clientService.update(clientId, museum);
  }

  @Delete(':clientId')
  @HttpCode(204)
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param('clientId') clientId: string) {
    return await this.clientService.delete(clientId);
  }
}
