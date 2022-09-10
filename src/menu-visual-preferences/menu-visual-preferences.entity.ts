import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class MenuVisualPreferenceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    name: String;

    @Column()
    file: String;

    /*
    @OneToOne(() => MenuEntity, menu => menu.menuTemplateAdjustment)
    menu: MenuEntity;
    */
    
}
