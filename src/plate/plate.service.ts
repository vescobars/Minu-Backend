import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/business-errors';

import { Repository } from 'typeorm';
import { PlateEntity } from './plate.entity';

@Injectable()
export class PlateService {

    constructor(
        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>
    ){}

    async findAll(): Promise<PlateEntity[]> {
        return await this.plateRepository.find({relations:["descriptionTags", "images"]})
    }

    async findOne(id: string): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id}, relations: ["descriptionTags", "images"]});
        if (!plate)
            throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);
        return plate;
    }

    async create(plate: PlateEntity): Promise<PlateEntity> {
        return this.plateRepository.save(plate);
    }

    async update (id: string, plate: PlateEntity): Promise<PlateEntity> {
        const persistedPlate: PlateEntity = await this.plateRepository.findOne({where:{id}});
        if (!persistedPlate)
            throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);

        return await this.plateRepository.save({...persistedPlate, ...plate});
    }

    async delete(id: string){
        const plate: PlateEntity = await this.plateRepository.findOne({where:{id}});
        if (!plate)
            throw new BusinessLogicException("The plate ith the given id was not found", BusinessError.NOT_FOUND)

        await this.plateRepository.remove(plate)
;    }
}
