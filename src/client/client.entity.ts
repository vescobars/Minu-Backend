import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { ImageEntity } from 'src/image/image.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ReviewEntity } from 'src/review/review.entity';
import {
    Column,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

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