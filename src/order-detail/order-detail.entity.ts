import { OrderEntity } from '../order/order.entity';
import { PlateEntity } from '../plate/plate.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  state: string;

  @Column()
  date: Date;

  @Column()
  notes: string;

  @OneToMany(() => OrderEntity, (order) => order.orderDetail)
  order: OrderEntity;

  @OneToMany(() => PlateEntity, (plate) => plate.orderDetail)
  plates: PlateEntity[];
}
