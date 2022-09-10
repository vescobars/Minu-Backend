import { OrderEntity } from 'src/order/order.entity';
import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class OrderDetailEntity {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    state: string;

    @Column()
    date:Date;

    @Column()
    notes:string;

    @OneToOne(() => OrderEntity, order => order.orderDetail)
    order: OrderEntity[];
}
