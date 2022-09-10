
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';
import { PayModeEntity } from 'src/pay-mode/pay-mode.entity';
import { TableEntity } from 'src/table/table.entity';
import {OneToOne,Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { JoinColumn } from 'typeorm/decorator/relations/JoinColumn';

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
    @JoinColumn()
    orderDetail: OrderDetailEntity;

    @OneToOne(() => PayModeEntity, payMode => payMode.order)
    @JoinColumn()
    payMode: PayModeEntity;

    @OneToOne(() => TableEntity, table => table.order)
    @JoinColumn()
    table: TableEntity;
}
