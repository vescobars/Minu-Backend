import { ClientEntity } from 'src/client/client.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
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

  @OneToOne(() => ClientEntity, client => client.profileImage)
  client: ClientEntity;

  @OneToOne(() => RestaurantOperatorEntity, restaurantOperator => restaurantOperator.profileImage)
  restaurantOperator: RestaurantOperatorEntity;

  @ManyToOne(() => PlateEntity, plate => plate.images)
  plate: PlateEntity;

  
}
