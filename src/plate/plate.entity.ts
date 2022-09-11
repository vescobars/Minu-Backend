import { CategoryEntity } from 'src/category/category.entity';
import { DescriptionTagEntity } from 'src/description-tag/description-tag.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class PlateEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    notes: string;

    @ManyToOne(() => CategoryEntity, category => category.plates)
    category = CategoryEntity;

    @OneToMany(() => DescriptionTagEntity, descriptionTag => descriptionTag.plate)
    descriptionTags: DescriptionTagEntity[];

    @OneToOne(() => PromotionEntity, promotion => promotion.plate)
    promotion: PromotionEntity;

    @OneToMany(() => ImageEntity, image => image.plate)
    image: ImageEntity;
}