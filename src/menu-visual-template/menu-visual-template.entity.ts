import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class MenuVisualTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  file: string;
}
