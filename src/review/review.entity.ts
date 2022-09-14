import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @Column()
    description: string;
}