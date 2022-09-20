import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateImageService } from './plate-image.service';

@Module({
  providers: [PlateImageService]
})
export class PlateImageModule {}
