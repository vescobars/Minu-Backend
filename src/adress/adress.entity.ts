import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoordinateEntity } from '../coordinate/coordinate.entity';

@Entity()
export class AdressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  direction: string;

  @OneToOne(() => CoordinateEntity, (coordinate) => coordinate.adress)
  @JoinColumn()
  coordinate: CoordinateEntity;
}
