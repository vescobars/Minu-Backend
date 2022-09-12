import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';

@Entity()
export class MenuEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @OneToMany(() => CategoryEntity, categories => categories.menu)
    categories: CategoryEntity[];


    /*
    @OneToOne(() => MenuVisualPreferencesEntity, menuVisualPreferences => menuVisualPreferences.menu)
    menuVisualPreferences: MenuVisualPreferencesEntity;
    */

    /*
    @OneToOne(() => MenuVisualTemplateEntity, MenuVisualTemplate => MenuVisualTemplate.sponsor)
    MenuVisualTemplate: MenuVisualTemplateEntity;
   */
}
