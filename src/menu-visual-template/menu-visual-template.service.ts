import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MenuVisualTemplateEntity } from './menu-visual-template.entity';

@Injectable()
export class MenuVisualTemplateService {
  constructor(
    @InjectRepository(MenuVisualTemplateEntity)
    private readonly menuVisualTemplateRepository: Repository<MenuVisualTemplateEntity>,
  ) {}

  async findAll(): Promise<MenuVisualTemplateEntity[]> {
    return await this.menuVisualTemplateRepository.find({
      relations: ['menu'],
    });
  }

  async findOne(id: string): Promise<MenuVisualTemplateEntity> {
    const menuVisualTemplate: MenuVisualTemplateEntity =
      await this.menuVisualTemplateRepository.findOne({
        where: { id },
        relations: ['menu'],
      });
    if (!menuVisualTemplate)
      throw new BusinessLogicException(
        'The menuVisualTemplate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return menuVisualTemplate;
  }

  async create(
    menuVisualTemplate: MenuVisualTemplateEntity,
  ): Promise<MenuVisualTemplateEntity> {
    return await this.menuVisualTemplateRepository.save(menuVisualTemplate);
  }

  async update(
    id: string,
    menuVisualTemplate: MenuVisualTemplateEntity,
  ): Promise<MenuVisualTemplateEntity> {
    const persistedMenuVisualTemplate: MenuVisualTemplateEntity =
      await this.menuVisualTemplateRepository.findOne({ where: { id } });
    if (!persistedMenuVisualTemplate)
      throw new BusinessLogicException(
        'The menuVisualTemplate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    menuVisualTemplate.id = id;

    return await this.menuVisualTemplateRepository.save(menuVisualTemplate);
  }

  async delete(id: string) {
    const menuVisualTemplate: MenuVisualTemplateEntity =
      await this.menuVisualTemplateRepository.findOne({ where: { id } });
    if (!menuVisualTemplate)
      throw new BusinessLogicException(
        'The menuVisualTemplate with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.menuVisualTemplateRepository.remove(menuVisualTemplate);
  }
}
