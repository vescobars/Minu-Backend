import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  opening_hour: string;

  @Column()
  closing_hour: string;
}
