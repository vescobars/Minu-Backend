import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>
    ){}

    async findAll(): Promise<AddressEntity[]> {
        return await this.addressRepository.find({ relations: [] });
    }

    async findOne(id: string): Promise<AddressEntity> {
        const address: AddressEntity = await this.addressRepository.findOne({where: {id}, relations: [] } );
        if (!address)
          throw new BusinessLogicException("The address with the given id was not found", BusinessError.NOT_FOUND);
    
        return address;
    }
    
    async create(address: AddressEntity): Promise<AddressEntity> {
        return await this.addressRepository.save(address);
    }

    async update(id: string, address: AddressEntity): Promise<AddressEntity> {
        const persistedAddress: AddressEntity = await this.addressRepository.findOne({where:{id}});
        if (!persistedAddress)
          throw new BusinessLogicException("The address with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.addressRepository.save({...persistedAddress, ...address});
    }

    async delete(id: string) {
        const address: AddressEntity = await this.addressRepository.findOne({where:{id}});
        if (!address)
          throw new BusinessLogicException("The address with the given id was not found", BusinessError.NOT_FOUND);
      
        await this.addressRepository.remove(address);
    }
}