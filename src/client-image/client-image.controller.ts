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
import { ImageDto } from 'src/image/image.dto';
import { ImageEntity } from 'src/image/image.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClientImageService } from './client-image.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClientImageController {
  constructor(private readonly clientImageService: ClientImageService) {}

  @Get(':clientId/images')
  async findImageByMuseumId(@Param('clientId') clientId: string) {
    return await this.clientImageService.findImageByMuseumId(clientId);
  }

  @Post(':clientId/images/:imageId')
  async addArtworkMuseum(
    @Param('clientId') clientId: string,
    @Param('imageId') imageId: string,
  ) {
    return await this.clientImageService.addImageClient(clientId, imageId);
  }

  @Put(':clientId/images')
  async associateArtworksMuseum(
    @Body() imageDto: ImageDto,
    @Param('clientId') clientId: string,
  ) {
    const images = plainToInstance(ImageEntity, imageDto);
    return await this.clientImageService.associateImageClient(clientId, images);
  }

  @Delete(':clientId/images/:imageId')
  @HttpCode(204)
  async deleteArtworkMuseum(
    @Param('clientId') clientId: string,
    @Param('imageId') imageId: string,
  ) {
    return await this.clientImageService.deleteImageClient(clientId, imageId);
  }
}
