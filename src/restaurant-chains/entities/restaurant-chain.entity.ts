import{ Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantChain {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    chainName: string;

}
