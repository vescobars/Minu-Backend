/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../category/category.entity';
import { DescriptionTagEntity } from '../../description-Tag/description-tag.entity';
import { PromotionEntity } from '../../promotion/promotion.entity';
import { PlateEntity } from '../../plate/plate.entity';
import { ReviewEntity } from '../../review/review.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [CategoryEntity, DescriptionTagEntity, PromotionEntity, PlateEntity, ReviewEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([CategoryEntity, DescriptionTagEntity, PromotionEntity, PlateEntity, ReviewEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/