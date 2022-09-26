import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll() {
      return await this.categoryService.findAll();
    }
  
    @Get(':categoryId')
    async findOne(@Param('categoryId') categoryId: string) {
      return await this.categoryService.findOne(categoryId);
    }
  
    @Post()
    async create(@Body() categoryDto: CategoryDto) {
      const category: CategoryEntity = plainToInstance(CategoryEntity, categoryDto);
      return await this.categoryService.create(category);
    }
  
    @Put(':categoryId')
    async update(@Param('categoryId') categoryId: string, @Body() categoryDto: CategoryDto) {
      const category: CategoryEntity = plainToInstance(CategoryEntity, categoryDto);
      return await this.categoryService.update(categoryId, category);
    }
  
    @Delete(':categoryId')
    @HttpCode(204)
    async delete(@Param('categoryId') categoryId: string) {
      return await this.categoryService.delete(categoryId);
    }

}
