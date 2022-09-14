import { OrderEntity } from 'src/order/order.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { OneToMany, Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: string;

  //TODO: REMOVE THIS ATRIBUTE (NO CORRESPONDE CON EL DIAGRAMA)
  @Column()
  state: string;

  //TODO: REMOVE THIS ATRIBUTE (NO CORRESPONDE CON EL DIAGRAMA)
  @Column()
  date: Date;

  @Column()
  notes: string;

  @OneToOne(() => OrderEntity, (order) => order.orderDetail)
  order: OrderEntity;

  @OneToMany(() => PlateEntity, (plate) => plate.orderDetail)
  plates: PlateEntity[];
}
