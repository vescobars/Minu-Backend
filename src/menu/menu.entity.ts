import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;
}
