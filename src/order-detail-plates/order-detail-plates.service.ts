import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { PlateEntity } from '../plate/plate.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/business-errors';

@Injectable()
export class OrderDetailPlatesService {
    constructor(
        @InjectRepository(OrderDetailEntity)
       private readonly orderDetailRepository: Repository<OrderDetailEntity>,
   
       @InjectRepository(PlateEntity)
       private readonly plateRepository: Repository<PlateEntity>
    ){}


    async addPlateOrderDetail(orderDetailId: string, plateId: string): Promise<OrderDetailEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND);
      
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}, relations: ["plates"]})
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND);
    
        orderDetail.plates = [...orderDetail.plates, plate];
        return await this.orderDetailRepository.save(orderDetail);
    }

    async findPlateByOrderDetailIdPlateId(orderDetailId: string, plateId: string): Promise<PlateEntity> {
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
       
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}, relations: ["plates"]});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
   
        const orderDetailPlate: PlateEntity = orderDetail.plates.find(e => e.id === plate.id);
   
        if (!orderDetailPlate)
          throw new BusinessLogicException("The plate with the given id is not associated to the orderDetail", BusinessError.PRECONDITION_FAILED)
   
        return orderDetailPlate;
    }

    async findPlatesByOrderDetailId(orderDetailId: string): Promise<PlateEntity[]> {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}, relations: ["plates"]});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
       
        return orderDetail.plates;
    }

    async associatePlatesOrderDetail(orderDetailId: string, plates: PlateEntity[]): Promise<OrderDetailEntity> {
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}, relations: ["plates"]});
    
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < plates.length; i++) {
          const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plates[i].id}});
          if (!plate)
            throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        orderDetail.plates = plates;
        return await this.orderDetailRepository.save(orderDetail);
    }

    async deletePlateOrderDetail(orderDetailId: string, plateId: string){
        const plate: PlateEntity = await this.plateRepository.findOne({where: {id: plateId}});
        if (!plate)
          throw new BusinessLogicException("The plate with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderDetail: OrderDetailEntity = await this.orderDetailRepository.findOne({where: {id: orderDetailId}, relations: ["plates"]});
        if (!orderDetail)
          throw new BusinessLogicException("The orderDetail with the given id was not found", BusinessError.NOT_FOUND)
    
        const orderDetailPlate: PlateEntity = orderDetail.plates.find(e => e.id === plate.id);
    
        if (!orderDetailPlate)
            throw new BusinessLogicException("The plate with the given id is not associated to the orderDetail", BusinessError.PRECONDITION_FAILED)
 
        orderDetail.plates = orderDetail.plates.filter(e => e.id !== plateId);
        await this.orderDetailRepository.save(orderDetail);
    }  
}
