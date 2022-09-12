import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
