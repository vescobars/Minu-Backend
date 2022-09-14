import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';
import { ImageEntity } from 'src/image/image.entity';
import { ClientImageService } from './client-image.service';

@Module({
  providers: [ClientImageService],
  imports: [TypeOrmModule.forFeature([ClientEntity, ImageEntity])],
})
export class ClientImageModule {}
