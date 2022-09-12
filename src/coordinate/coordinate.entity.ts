import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdressEntity } from '../adress/adress.entity';

@Entity()
export class CoordinateEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    length: number  
        
    @Column()
    latitude: number

    @OneToOne(() => AdressEntity, adress => adress.coordinate)
    adress: AdressEntity;
}
