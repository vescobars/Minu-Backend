import { ClientEntity } from 'src/client/client.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class CoordinateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  length: number;

  @Column()
  latitude: number;

  @OneToOne(() => ClientEntity, (client) => client.current_location)
  client: ClientEntity;
}
