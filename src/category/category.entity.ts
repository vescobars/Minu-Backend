import { PlateEntity } from 'src/plate/plate.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class CategoryEntity 
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() =>PlateEntity, plate => plate.category)
    plates: PlateEntity[];
}