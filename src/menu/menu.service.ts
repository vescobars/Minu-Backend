import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MenuEntity } from './menu.entity';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>
    ){}

    async findAll(): Promise<MenuEntity[]> {
        return await this.menuRepository.find({ relations: ["categories"] });
    }

    async findOne(id: string): Promise<MenuEntity> {
        const menu: MenuEntity = await this.menuRepository.findOne({where: {id}, relations: ["categories"] } );
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND);
    
        return menu;
    }
    
    async create(menu: MenuEntity): Promise<MenuEntity> {
        return await this.menuRepository.save(menu);
    }

    async update(id: string, menu: MenuEntity): Promise<MenuEntity> {
        const persistedMenu: MenuEntity = await this.menuRepository.findOne({where:{id}});
        if (!persistedMenu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.menuRepository.save({...persistedMenu, ...menu});
    }

    async delete(id: string) {
        const menu: MenuEntity = await this.menuRepository.findOne({where:{id}});
        if (!menu)
          throw new BusinessLogicException("The menu with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.menuRepository.remove(menu);
    }
}
