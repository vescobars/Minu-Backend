import { MenuEntity } from '../menu/menu.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuVisualTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  file: string;

  @OneToOne(() => MenuEntity, (menu) => menu.menuVisualTemplate)
  menu: MenuEntity;
}
