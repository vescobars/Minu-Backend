import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { MenuVisualTemplateDto } from './menu-visual-template.dto';
import { MenuVisualTemplateEntity } from './menu-visual-template.entity';
import { MenuVisualTemplateService } from './menu-visual-template.service';

@Controller('menuVisualTemplates')
@UseInterceptors(BusinessErrorsInterceptor)
export class MenuVisualTemplateController {
  constructor(
    private readonly menuVisualTemplateService: MenuVisualTemplateService,
  ) {}

  @Get()
  async findAll() {
    return await this.menuVisualTemplateService.findAll();
  }

  @Get(':menuVisualTemplateId')
  async findOne(@Param('menuVisualTemplateId') menuVisualTemplateId: string) {
    return await this.menuVisualTemplateService.findOne(menuVisualTemplateId);
  }

  @Post()
  async create(@Body() menuVisualTemplateDto: MenuVisualTemplateDto) {
    const menuVisualTemplate: MenuVisualTemplateEntity = plainToInstance(
      MenuVisualTemplateEntity,
      menuVisualTemplateDto,
    );
    return await this.menuVisualTemplateService.create(menuVisualTemplate);
  }

  @Put(':menuVisualTemplateId')
  async update(
    @Param('menuVisualTemplateId') menuVisualTemplateId: string,
    @Body() menuVisualTemplateDto: MenuVisualTemplateDto,
  ) {
    const menuVisualTemplate: MenuVisualTemplateEntity = plainToInstance(
      MenuVisualTemplateEntity,
      menuVisualTemplateDto,
    );
    return await this.menuVisualTemplateService.update(
      menuVisualTemplateId,
      menuVisualTemplate,
    );
  }

  @Delete(':menuVisualTemplateId')
  @HttpCode(204)
  async delete(@Param('menuVisualTemplateId') menuVisualTemplateId: string) {
    return await this.menuVisualTemplateService.delete(menuVisualTemplateId);
  }
}
