import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CoordinateDto } from 'src/coordinate/coordinate.dto';
import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClientCoordinateService } from './client-coordinate.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientCoordinateController {
  constructor(
    private readonly clientCoordinateService: ClientCoordinateService,
  ) {}

  @Get(':clientId/coordinates')
  async findImageByMuseumId(@Param('clientId') clientId: string) {
    return await this.clientCoordinateService.findCoordinateByClientId(
      clientId,
    );
  }

  @Post(':clientId/coordinates/:coordinateId')
  async addArtworkMuseum(
    @Param('clientId') clientId: string,
    @Param('coordinateId') coordinateId: string,
  ) {
    return await this.clientCoordinateService.addCoordinateClient(
      clientId,
      coordinateId,
    );
  }

  @Put(':clientId/coordinates')
  async associateArtworksMuseum(
    @Body() coordinateDto: CoordinateDto,
    @Param('clientId') clientId: string,
  ) {
    const coordinates = plainToInstance(CoordinateEntity, coordinateDto);
    return await this.clientCoordinateService.associateCoordinateClient(
      clientId,
      coordinates,
    );
  }

  @Delete(':clientId/coordinates/:coordinateId')
  @HttpCode(204)
  async deleteArtworkMuseum(
    @Param('clientId') clientId: string,
    @Param('coordinateId') coordinateId: string,
  ) {
    return await this.clientCoordinateService.deleteCoordinateClient(
      clientId,
      coordinateId,
    );
  }
}
