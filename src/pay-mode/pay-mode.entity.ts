import {OneToOne,OneToMany,ManyToOne,ManyToMany, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PayModeEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    type:string;
}
