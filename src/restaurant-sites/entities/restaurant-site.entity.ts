import {Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantSite {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    description: String;

    @Column()
    openingTime: Date;

    @Column()
    closingTime: Date;
}
