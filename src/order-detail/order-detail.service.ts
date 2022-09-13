import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Injectable()
export class OrderDetailService {

    constructor(
        @InjectRepository(OrderDetailEntity)
        private readonly orderDetailRepository: Repository<OrderDetailEntity>
    ){}
}
