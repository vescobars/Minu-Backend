import { PlateEntity } from '../plate/plate.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { MenuEntity } from '../menu/menu.entity';


@Entity()
export class CategoryEntity 
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() =>PlateEntity, plate => plate.category)
    plates: PlateEntity[];

    @ManyToOne(() => MenuEntity, menu => menu.categories)
    menu: MenuEntity;
}