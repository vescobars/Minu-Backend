import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { OrderEntity } from '../order/order.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class OrderOrderDetailService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    
        @InjectRepository(OrderDetailEntity)
        private readonly orderDetailRepository: Repository<OrderDetailEntity>
    ){}


    async addOrderDetailOrder(orderId: string, orderDetailId: string): Promise<OrderEntity> {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND);
      
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]})
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
    
        order.orderDetail = orderDetail;
        return await this.orderRepository.save(order);
    }

    async findOrderDetailByOrderIdOrderDetailId(orderId: string, orderDetailId: string): Promise<OrderDetailEntity> {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
       
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
   
        const orderOrderDetail: OrderDetailEntity = order.orderDetail;
   
        if (!orderOrderDetail)
          throw new BusinessLogicException("The orderDetail with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
   
        return orderOrderDetail;
    }

    async findOrderDetailByOrderId(orderId: string): Promise<OrderDetailEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
       
        return order.orderDetail;
    }

    async associateOrderDetailOrder(orderId: string, orderDetail: OrderDetailEntity): Promise<OrderEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
    
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderDetailFound: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetail.id}});
        if (!orderDetailFound)
            throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
        
        order.orderDetail = orderDetail;
        return await this.orderRepository.save(order);
    }

    async deleteOrderDetailOrder(orderId: string, orderDetailId: string){
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
    
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderOrderDetail: OrderDetailEntity = order.orderDetail;
    
        if (!orderOrderDetail)
            throw new BusinessLogicException("The orderDetail with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
 
        order.orderDetail = null;
        await this.orderRepository.save(order);
    }
}
