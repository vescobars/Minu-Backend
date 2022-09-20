import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { PayModeEntity } from '../pay-mode/pay-mode.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class OrderPayModeService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,

        @InjectRepository(PayModeEntity)
        private readonly payModeRepository: Repository<PayModeEntity>
    ){}

    async addPayModeOrder(orderId: string, payModeId: string): Promise<OrderEntity> {
        const payMode: PayModeEntity = await this.payModeRepository.findOne({where: {id: payModeId}});
        if (!payMode)
          throw new BusinessLogicException("The payMode with the given id was not found", BusinessError.NOT_FOUND);
      
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]})
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
    
        order.payMode = payMode;
        return await this.orderRepository.save(order);
    }

    async findPayModeByOrderIdPayModeId(orderId: string, payModeId: string): Promise<PayModeEntity> {
        const payMode: PayModeEntity = await this.payModeRepository.findOne({where: {id: payModeId}});
        if (!payMode)
          throw new BusinessLogicException("The payMode with the given id was not found", BusinessError.NOT_FOUND)
       
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
   
        const orderPayMode: PayModeEntity = order.payMode;
   
        if (!orderPayMode)
          throw new BusinessLogicException("The payMode with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
   
        return orderPayMode;
    }

    async findPayModeByOrderId(orderId: string): Promise<PayModeEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
       
        return order.payMode;
    }

    async associatePayModeOrder(orderId: string, payMode: PayModeEntity): Promise<OrderEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
    
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const payModeFound: PayModeEntity = await this.payModeRepository.findOne({where: {id: payMode.id}});
        if (!payModeFound)
            throw new BusinessLogicException("The payMode with the given id was not found", BusinessError.NOT_FOUND)
        
        order.payMode = payMode;
        return await this.orderRepository.save(order);
    }

    async deletePayModeOrder(orderId: string, payModeId: string){
        const payMode: PayModeEntity = await this.payModeRepository.findOne({where: {id: payModeId}});
        if (!payMode)
          throw new BusinessLogicException("The payMode with the given id was not found", BusinessError.NOT_FOUND)
    
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderPayMode: PayModeEntity = order.payMode;
    
        if (!orderPayMode)
            throw new BusinessLogicException("The payMode with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
 
        order.payMode = null;
        await this.orderRepository.save(order);
    }
}
