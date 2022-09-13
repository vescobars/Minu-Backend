import { AddressEntity } from 'src/address/address.entity';
import { ClientEntity } from 'src/client/client.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CoordinateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  length: number;

  @Column()
  latitude: number;

  @OneToOne(() => ClientEntity, (client) => client.currentLocation)
  client: ClientEntity;

  @OneToOne(() => AddressEntity, (address) => address.coordinate)
  address: AddressEntity;
}
