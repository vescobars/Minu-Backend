import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';


@Entity()
export class MenuVisualPreferenceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    file: String;
    
    @OneToOne(() => MenuEntity, menu => menu.menuVisualPreferences)
    menu: MenuEntity;
    
}
