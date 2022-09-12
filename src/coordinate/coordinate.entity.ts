import { AdressEntity } from 'src/adress/adress.entity';
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

  @OneToOne(() => ClientEntity, (client) => client.current_location)
  client: ClientEntity;

  @OneToOne(() => AdressEntity, (adress) => adress.coordinate)
  adress: AdressEntity;
}
