import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class TableEntity {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    seats:number;

    @Column()
    number:number;

    @Column()
    occupied:boolean;
}
