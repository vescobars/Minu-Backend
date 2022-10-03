import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoryDto } from './category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { HasRoles } from '../shared/security/roles.decorators';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('categories')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async findAll() {
      return await this.categoryService.findAll();
    }
 
    @HasRoles(Role.Reader)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':categoryId')
    async findOne(@Param('categoryId') categoryId: string) {
      return await this.categoryService.findOne(categoryId);
    }
  
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async create(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
      const category: CategoryEntity = plainToInstance(CategoryEntity, categoryDto);
      return await this.categoryService.create(category);
    }
    
    @HasRoles(Role.Writer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':categoryId')
    async update(@Param('categoryId') categoryId: string, @Body() categoryDto: CategoryDto) {
      const category: CategoryEntity = plainToInstance(CategoryEntity, categoryDto);
      return await this.categoryService.update(categoryId, category);
    }
    
    @HasRoles(Role.Deleter)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':categoryId')
    @HttpCode(204)
    async delete(@Param('categoryId') categoryId: string) {
      return await this.categoryService.delete(categoryId);
    }

}
