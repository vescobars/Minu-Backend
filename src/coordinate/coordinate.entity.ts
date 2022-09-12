import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class CoordinateEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    length: number  
    
    @Column()
    latitude: number
}
