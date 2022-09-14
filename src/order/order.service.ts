import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
    ){}

    async findAll(): Promise<OrderEntity[]> {
        return await this.orderRepository.find({ relations: ["orderDetail", "payMode","table"] });
    }

    async findOne(id: string): Promise<OrderEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id}, relations: ["orderDetail", "payMode","table"] } );
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
   
        return order;
    }

    async create(order: OrderEntity): Promise<OrderEntity> {
        return await this.orderRepository.save(order);
    }

    async update(id: string, order: OrderEntity): Promise<OrderEntity> {
        const persistedOrder: OrderEntity = await this.orderRepository.findOne({where:{id}});
        if (!persistedOrder)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.orderRepository.save({...persistedOrder, ...order});
    }

    async delete(id: string) {
        const order: OrderEntity = await this.orderRepository.findOne({where:{id}});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.orderRepository.remove(order);
    }
}
