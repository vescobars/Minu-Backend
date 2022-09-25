import { Module } from '@nestjs/common';
import { CategoryPlateService } from './category-plate.service';
import { CategoryPlateController } from './category-plate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { PlateEntity } from '../plate/plate.entity';

@Module({
  providers: [CategoryPlateService],
  controllers: [CategoryPlateController],
  imports: [TypeOrmModule.forFeature([CategoryEntity, PlateEntity])],
})
export class CategoryPlateModule {}
