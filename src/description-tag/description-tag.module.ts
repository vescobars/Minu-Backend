import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlateEntity } from 'src/plate/plate.entity';
import { DescriptionTagEntity } from './description-tag.entity';
import { DescriptionTagService } from './description-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionTagEntity])],
  providers: [DescriptionTagService]
})

  export class DescriptionTagModule { }
