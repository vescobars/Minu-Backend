import { OrderEntity } from 'src/order/order.entity';
import { PlateEntity } from 'src/plate/plate.entity';
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
  plate: PlateEntity[];
}
