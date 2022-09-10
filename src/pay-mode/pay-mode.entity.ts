import { OrderEntity } from 'src/order/order.entity';
import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PayModeEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    type:string;

    @OneToOne(() => OrderEntity, order => order.payMode)
    order: OrderEntity;
}
