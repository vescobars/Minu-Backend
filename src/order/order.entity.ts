import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    state:String;

    @Column()
    date:Date;

    @Column()
    totalValue: number;
}
