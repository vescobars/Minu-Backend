import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../order/order.entity';
import { TableEntity } from '../table/table.entity';
import { Repository, Table } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class OrderTableService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    
        @InjectRepository(TableEntity)
        private readonly tableRepository: Repository<TableEntity>
    ){}

    async addTableOrder(orderId: string, tableId: string): Promise<OrderEntity> {
        const table: TableEntity = await this.tableRepository.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND);
      
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]})
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND);
    
        order.table = table;
        return await this.orderRepository.save(order);
    }

    async findTableByOrderIdTableId(orderId: string, tableId: string): Promise<TableEntity> {
        const table: TableEntity = await this.tableRepository.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
       
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
   
        const orderTable: TableEntity = order.table;
   
        if (!orderTable)
          throw new BusinessLogicException("The table with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
   
        return orderTable;
    }

    async findTableByOrderId(orderId: string): Promise<TableEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
       
        return order.table;
    }

    async associateTableOrder(orderId: string, table: TableEntity): Promise<OrderEntity> {
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
    
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const tableFound: TableEntity = await this.tableRepository.findOne({where: {id: table.id}});
        if (!tableFound)
            throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
        
        order.table = table;
        return await this.orderRepository.save(order);
    }

    
    async deleteTableOrder(orderId: string, tableId: string){
        const table: TableEntity = await this.tableRepository.findOne({where: {id: tableId}});
        if (!table)
          throw new BusinessLogicException("The table with the given id was not found", BusinessError.NOT_FOUND)
    
        const order: OrderEntity = await this.orderRepository.findOne({where: {id: orderId}, relations: ["orderDetail","payMode","table"]});
        if (!order)
          throw new BusinessLogicException("The order with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderTable: TableEntity = order.table;
    
        if (!orderTable)
            throw new BusinessLogicException("The table with the given id is not associated to the order", BusinessError.PRECONDITION_FAILED)
 
        order.table = null;
        await this.orderRepository.save(order);
    }
}
