import { Module } from '@nestjs/common';
import { PlateDescriptionTagService } from './plate-description-tag.service';
import { PlateDescriptionTagController } from './plate-description-tag.controller';

@Module({
  providers: [PlateDescriptionTagService],
  controllers: [PlateDescriptionTagController]
})
export class PlateDescriptionTagModule {}
