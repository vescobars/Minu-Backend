import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuVisualTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  file: string;
}
