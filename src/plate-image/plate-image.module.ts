import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateImageService } from './plate-image.service';
import { PlateImageController } from './plate-image.controller';
import { ImageEntity } from '../image/image.entity';
import { PlateEntity } from '../plate/plate.entity';

@Module({
  providers: [PlateImageService],
  controllers: [PlateImageController],
  imports: [TypeOrmModule.forFeature([ImageEntity, PlateEntity])],
})
export class PlateImageModule {}
