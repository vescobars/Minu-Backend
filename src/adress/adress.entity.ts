import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdressEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    location: string

    @Column()
    city: string

    @Column()
    neighborhood: string

    @Column()
    direction: string
}
