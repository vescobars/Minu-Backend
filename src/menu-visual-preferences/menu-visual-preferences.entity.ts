import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';


@Entity()
export class MenuVisualPreferenceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    file: string;
    
    @OneToOne(() => MenuEntity, (menu) => menu.menuVisualPreferences)
  @JoinColumn()
  menu: MenuEntity;
    
}
