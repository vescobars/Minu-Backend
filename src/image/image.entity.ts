import { ClientEntity } from 'src/client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @OneToOne(() => ClientEntity, (client) => client.profile_image)
  client: ClientEntity;

  /* 
    //operatorImage? profileImage?
    @OneToOne(() => RestaurantOperatorEntity, restaurantOperator => restaurantOperator.operatorImage)
    restaurantOperator: RestaurantOperatorEntity;
    */
}
