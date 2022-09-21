import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { CategoryPlateService } from './category-plate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, PlateEntity])],
  providers: [CategoryPlateService],
})
export class CategoryPlateModule {}
