import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableEntity)
        private readonly tableRepository: Repository<TableEntity>
    ){}

    async findAll(): Promise<TableEntity[]> {
        return await this.tableRepository.find({ relations: ["order"] });
    }

    async findOne(id: string): Promise<TableEntity> {
        const table: TableEntity = await this.tableRepository.findOne({where: {id}, relations: ["order"] } );
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND);
   
        return table;
    }

    async create(table: TableEntity): Promise<TableEntity> {
        return await this.tableRepository.save(table);
    }

    async update(id: string, table: TableEntity): Promise<TableEntity> {
        const persistedTable: TableEntity = await this.tableRepository.findOne({where:{id}});
        if (!persistedTable)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.tableRepository.save({...persistedTable, ...table});
    }

    async delete(id: string) {
        const table: TableEntity = await this.tableRepository.findOne({where:{id}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.tableRepository.remove(table);
    }
}
