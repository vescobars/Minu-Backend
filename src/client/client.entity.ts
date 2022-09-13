import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { ImageEntity } from 'src/image/image.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ReviewEntity } from 'src/review/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => ImageEntity, image => image.client)
  @JoinColumn()
  profile_image: ImageEntity;

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders: OrderEntity[];

  @OneToOne(() => CoordinateEntity, (coordinate) => coordinate.client)
  @JoinColumn()
  current_location: CoordinateEntity;

  @OneToMany(() => ReviewEntity, (review) => review.client)
  reviews: ReviewEntity[];
}
