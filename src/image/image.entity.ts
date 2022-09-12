import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    url: String;
    
    /* 
    //clientImage? profileImage?
    @OneToOne(() => ClientEntity, client => client.clientImage)
    client: ClientEntity;
    */

    /* 
    //operatorImage? profileImage?
    @OneToOne(() => RestaurantOperatorEntity, restaurantOperator => restaurantOperator.operatorImage)
    restaurantOperator: RestaurantOperatorEntity;
    */
}
