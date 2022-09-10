import { OrderEntity } from 'src/order/order.entity';
import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { PlainObjectToNewEntityTransformer } from 'typeorm/query-builder/transformer/PlainObjectToNewEntityTransformer';

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

    @OneToMany(() => OrderEntity, order => order.orderDetail)
    order: OrderEntity[];

    //Awaiting integration in development where the plates class should be created by G.Cagua
    /*
    @OneToMany(() => PlateEntity , plate -> plate.orderDetail)
    plate: PlateEntity[];
    */
}
