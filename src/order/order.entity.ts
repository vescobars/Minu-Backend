
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';
import {OneToOne,Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    state:string;

    @Column()
    date:Date;

    @Column()
    totalValue: number;

    @OneToOne(() => OrderDetailEntity, orderDetail => orderDetail.order)
    orderDetail: OrderDetailEntity[];
}
