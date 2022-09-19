import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences.entity';

@Injectable()
export class MenuVisualPreferencesService {
    constructor(
        @InjectRepository(MenuVisualPreferenceEntity)
        private readonly menuVisualPreferencesRepository: Repository<MenuVisualPreferenceEntity>
    ){}

    async findAll(): Promise<MenuVisualPreferenceEntity[]> {
        return await this.menuVisualPreferencesRepository.find({
            relations: ["menu"] 
        });
    }

    async findOne(id: string): Promise<MenuVisualPreferenceEntity> {
        const menuVisualPreference: MenuVisualPreferenceEntity = await this.menuVisualPreferencesRepository.findOne({
            where: {id}, 
            relations: ["menu"] 
        });
        if (!menuVisualPreference)
          throw new BusinessLogicException(
            "The menuVisualPreference with the given id was not found", 
            BusinessError.NOT_FOUND
          );
   
        return menuVisualPreference;
    }

    async create(menuVisualPreference: MenuVisualPreferenceEntity): Promise<MenuVisualPreferenceEntity> {
        return await this.menuVisualPreferencesRepository.save(menuVisualPreference);
    }
 
    async update(id: string, menuVisualPreference: MenuVisualPreferenceEntity): Promise<MenuVisualPreferenceEntity> {
        const persistedMenuVisualPref: MenuVisualPreferenceEntity = await this.menuVisualPreferencesRepository.findOne({
            where:{id}
        });
        if (!persistedMenuVisualPref)
          throw new BusinessLogicException(
            "The menuVisualPreference with the given id was not found",
            BusinessError.NOT_FOUND
          );
       
        menuVisualPreference.id = id; 
       
        return await this.menuVisualPreferencesRepository.save(menuVisualPreference);
    }
 
    async delete(id: string) {
        const menuVisualPreference: MenuVisualPreferenceEntity = await this.menuVisualPreferencesRepository.findOne({
            where:{id}
        });
        if (!menuVisualPreference)
          throw new BusinessLogicException(
            "The menuVisualPreference with the given id was not found",
            BusinessError.NOT_FOUND
          );
     
        await this.menuVisualPreferencesRepository.remove(menuVisualPreference);
    }
}
