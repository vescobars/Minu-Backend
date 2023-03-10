import { CategoryEntity } from '../category/category.entity';
import { DescriptionTagEntity } from '../description-tag/description-tag.entity';
import { ImageEntity } from '../image/image.entity';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { PromotionEntity } from '../promotion/promotion.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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

  @ManyToOne(() => CategoryEntity, (category) => category.plates)
  category : CategoryEntity;

  @OneToMany(() => DescriptionTagEntity, (descriptionTag) => descriptionTag.plate)
  descriptionTags: DescriptionTagEntity[];

  @OneToOne(() => PromotionEntity, (promotion) => promotion.plate)
  @JoinColumn()
  promotion: PromotionEntity;

  @OneToMany(() => ImageEntity, (image) => image.plate)
  images: ImageEntity[];

  @ManyToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.plates)
  orderDetail: OrderDetailEntity;
}
