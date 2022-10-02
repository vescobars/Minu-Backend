import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/category.entity';
import { MenuEntity } from '../menu/menu.entity';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryController } from './menu-category.controller';

@Module({
  providers: [MenuCategoryService],
  imports: [TypeOrmModule.forFeature([MenuEntity, CategoryEntity])],
  controllers: [MenuCategoryController],
})
export class MenuCategoryModule {}
