import { ClientEntity } from '../client/client.entity';
import { PlateEntity } from '../plate/plate.entity';
import { RestaurantOperatorEntity } from '../restaurant-operator/restaurant-operator.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => PlateEntity, (plate) => plate.images)
  plate: PlateEntity;
}
