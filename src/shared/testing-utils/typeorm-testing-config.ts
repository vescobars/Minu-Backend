/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { DescriptionTagEntity } from 'src/description-Tag/description-tag.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { ReviewEntity } from 'src/review/review.entity';

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