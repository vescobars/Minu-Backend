import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/image/image.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { PlateImageService } from './plate-image.service';
import { PlateImageController } from './plate-image.controller';

@Module({
  providers: [PlateImageService],
  controllers: [PlateImageController],
  imports: [TypeOrmModule.forFeature([ImageEntity, PlateEntity])],
})
export class PlateImageModule {}
