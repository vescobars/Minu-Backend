import { OrderEntity } from '../order/order.entity';
import { PlateEntity } from '../plate/plate.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

  @OneToOne(() => OrderEntity, (order) => order.orderDetail)
  order: OrderEntity;

  @OneToMany(() => PlateEntity, (plate) => plate.orderDetail)
  plates: PlateEntity[];
}
