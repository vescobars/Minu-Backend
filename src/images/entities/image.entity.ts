import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    url: String;
}
