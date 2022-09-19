import { CoordinateEntity } from '../coordinate/coordinate.entity';
import { ImageEntity } from '../image/image.entity';
import { OrderEntity } from '../order/order.entity';
import { ReviewEntity } from '../review/review.entity';
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
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @OneToOne(() => ImageEntity, profileImage => profileImage.client)
    @JoinColumn()
    profileImage: ImageEntity;

    @OneToMany(() => OrderEntity, order => order.client)
    orders: OrderEntity[];

    @OneToOne(() => CoordinateEntity, currentLocation => currentLocation.client)
    @JoinColumn()
    currentLocation: CoordinateEntity;

    @OneToMany(() => ReviewEntity, review => review.client)
    reviews: ReviewEntity[];
}