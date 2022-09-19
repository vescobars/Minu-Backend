import { Module } from '@nestjs/common';
import { PlateImageService } from './plate-image.service';

@Module({
  providers: [PlateImageService]
})
export class PlateImageModule {}
