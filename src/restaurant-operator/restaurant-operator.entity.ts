import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RestaurantOperatorEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstname:string

    @Column()
    cellphone:string

    @Column()
    lastname:string

    @Column()
    email:string

    @Column()
    role:string

    @Column()
    active:boolean

    /*
    @OneToOne(() => ImageEntity, image => image.restauranOperator)
    @JoinColumn()
    image: ImageEntity;
*/
}
