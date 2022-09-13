import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableEntity)
        private readonly tableRepository: Repository<TableEntity>
    ){}
}
