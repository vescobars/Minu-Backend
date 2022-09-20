import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayModeEntity } from './pay-mode.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class PayModeService {

    constructor(
        @InjectRepository(PayModeEntity)
        private readonly payModeRepository: Repository<PayModeEntity>
    ){}
    
    async findAll(): Promise<PayModeEntity[]>{
        return await this.payModeRepository.find();
    }

    async findOne(id: string): Promise<PayModeEntity>{
        const paymode: PayModeEntity = await this.payModeRepository.findOne({where: {id}});
        if(!paymode){
            throw new BusinessLogicException("The paymode with the given id was not found", BusinessError.NOT_FOUND)
        }
        return paymode;
    }

    async create(paymode: PayModeEntity): Promise<PayModeEntity>{
        return await this.payModeRepository.save(paymode);
    }

    async update(id: string, paymode: PayModeEntity): Promise<PayModeEntity>{
        const persistedPayMode: PayModeEntity = await this.payModeRepository.findOne({where:{id}});
        if(!persistedPayMode){
            throw new BusinessLogicException("The paymode with the given id was not found", BusinessError.NOT_FOUND)
        }

        return await this.payModeRepository.save({...persistedPayMode,...paymode});
    }

    async delete(id: string){
        const paymode : PayModeEntity = await this.payModeRepository.findOne({where: {id}});
        if(!paymode){
            throw new BusinessLogicException("The paymode with the given id was not found", BusinessError.NOT_FOUND)
        }

        await this.payModeRepository.remove(paymode);
    }

    
}
