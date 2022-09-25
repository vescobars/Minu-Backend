import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateEntity } from '../plate/plate.entity';
import { DescriptionTagEntity } from './description-tag.entity';
import { DescriptionTagService } from './description-tag.service';
import { DescriptionTagController } from './description-tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionTagEntity])],
  providers: [DescriptionTagService],
  controllers: [DescriptionTagController]
})

  export class DescriptionTagModule { }
