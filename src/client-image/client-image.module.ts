import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { ImageEntity } from '../image/image.entity';
import { ClientImageController } from './client-image.controller';
import { ClientImageService } from './client-image.service';

@Module({
  providers: [ClientImageService],
  imports: [TypeOrmModule.forFeature([ClientEntity, ImageEntity])],
  controllers: [ClientImageController],
})
export class ClientImageModule {}
