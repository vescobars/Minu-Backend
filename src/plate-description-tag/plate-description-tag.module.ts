import { Module } from '@nestjs/common';
import { PlateDescriptionTagService } from './plate-description-tag.service';

@Module({
  providers: [PlateDescriptionTagService]
})
export class PlateDescriptionTagModule {}
