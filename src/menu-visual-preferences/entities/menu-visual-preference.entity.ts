import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class MenuVisualPreference {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    file: String;

    
}
