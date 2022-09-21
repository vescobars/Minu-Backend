import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { PlateImageService } from './plate-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, PlateEntity])],
  providers: [PlateImageService],
})
export class PlateImageModule {}
