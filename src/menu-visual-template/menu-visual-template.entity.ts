import { MenuEntity } from 'src/menu/menu.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class MenuVisualTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  file: string;

  @OneToOne(() => MenuEntity, menu => menu.menuVisualTemplate)
  menu: MenuEntity;
}
