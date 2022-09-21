import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DescriptionTagEntity } from 'src/description-tag/description-tag.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { PlateModule } from 'src/plate/plate.module';
import { PlateDescriptionTagService } from './plate-description-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlateEntity, DescriptionTagEntity])],
  providers: [PlateDescriptionTagService],
})
export class PlateDescriptionTagModule {}
