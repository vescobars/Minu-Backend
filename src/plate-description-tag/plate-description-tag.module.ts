import { Module } from '@nestjs/common';
import { PlateDescriptionTagService } from './plate-description-tag.service';
import { PlateDescriptionTagController } from './plate-description-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateEntity } from '../plate/plate.entity';
import { DescriptionTagEntity } from '../description-tag/description-tag.entity';

@Module({
  providers: [PlateDescriptionTagService],
  controllers: [PlateDescriptionTagController],
  imports: [TypeOrmModule.forFeature([PlateEntity, DescriptionTagEntity])],
})
export class PlateDescriptionTagModule {}
