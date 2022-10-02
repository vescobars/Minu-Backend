import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryDto } from '../category/category.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MenuCategoryService } from './menu-category.service';

@Controller('menus')
@UseInterceptors(BusinessErrorsInterceptor)
export class MenuCategoryController {
    constructor(private readonly menuCategoryService: MenuCategoryService){}

    @Post(':menuId/categorys/:categoryId')
    async addCategoryMenu(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string){
        return await this.menuCategoryService.addCategoryMenu(menuId, categoryId);
    }

    @Get(':menuId/categorys/:categoryId')
    async findCategoryByMenuIdCategoryId(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string){
        return await this.menuCategoryService.findCategoryByMenuIdCategoryId(menuId, categoryId);
    }

    @Get(':menuId/categorys')
    async findCategorysByMenuId(@Param('menuId') menuId: string){
        return await this.menuCategoryService.findCategorysByMenuId(menuId);
    }

    @Put(':menuId/categorys')
    async associateCategorysMenu(@Body() categorysDto: CategoryDto[], @Param('menuId') menuId: string){
        const categorys = plainToInstance(CategoryEntity, categorysDto)
        return await this.menuCategoryService.associateCategorysMenu(menuId, categorys);
    }
    
    @Delete(':menuId/categorys/:categoryId')
    @HttpCode(204)
    async deleteCategoryMenu(@Param('menuId') menuId: string, @Param('categoryId') categoryId: string){
        return await this.menuCategoryService.deleteCategoryMenu(menuId, categoryId);
    }
}
