import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { MenuVisualPreferenceEntity } from '../menu-visual-preferences/menu-visual-preferences.entity';

@Entity()
export class MenuEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @OneToMany(() => CategoryEntity, categories => categories.menu)
    categories: CategoryEntity[];



    @OneToOne(() => MenuVisualPreferenceEntity, menuVisualPreferences => menuVisualPreferences.menu)
    menuVisualPreferences: MenuVisualPreferenceEntity;

    /*
    @OneToOne(() => MenuVisualTemplateEntity, MenuVisualTemplate => MenuVisualTemplate.sponsor)
    MenuVisualTemplate: MenuVisualTemplateEntity;
   */
}
