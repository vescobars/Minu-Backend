import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Injectable()
export class OrderDetailService {

    constructor(
        @InjectRepository(OrderDetailEntity)
        private readonly orderDetailRepository: Repository<OrderDetailEntity>
    ){}

    async findAll(): Promise<OrderDetailEntity[]> {
        return await this.orderDetailRepository.find({ relations: ["plates"] });
    }

    async findOne(id: string): Promise<OrderDetailEntity> {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id}, relations: ["plates"] } );
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND);
   
        return orderDetail;
    }

    async create(orderDetail: OrderDetailEntity): Promise<OrderDetailEntity> {
        return await this.orderDetailRepository.save(orderDetail);
    }

    async update(id: string, orderDetail: OrderDetailEntity): Promise<OrderDetailEntity> {
        const persistedOrderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where:{id}});
        if (!persistedOrderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.orderDetailRepository.save({...persistedOrderDetail, ...orderDetail});
    }

    async delete(id: string) {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where:{id}});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.orderDetailRepository.remove(orderDetail);
    }
}
