import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressEntity } from 'src/adress/adress.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { DescriptionTagEntity } from 'src/description-tag/description-tag.entity';
import { ImageEntity } from 'src/image/image.entity';
import { MenuVisualPreferenceEntity } from 'src/menu-visual-preferences/menu-visual-preferences.entity';
import { MenuVisualTemplateEntity } from 'src/menu-visual-template/menu-visual-template.entity';
import { MenuEntity } from 'src/menu/menu.entity';
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';
import { OrderEntity } from 'src/order/order.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { TableEntity } from 'src/table/table.entity';
import { PayModeEntity } from '../../pay-mode/pay-mode.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [PayModeEntity,AdressEntity,CategoryEntity,CoordinateEntity,DescriptionTagEntity,ImageEntity,MenuEntity,MenuVisualPreferenceEntity,MenuVisualTemplateEntity,OrderDetailEntity,OrderEntity,PlateEntity,PromotionEntity,RestaurantChainEntity,RestaurantOperatorEntity,RestaurantSiteEntity,ReviewEntity,ScheduleEntity,TableEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PayModeEntity,AdressEntity,CategoryEntity,CoordinateEntity,DescriptionTagEntity,ImageEntity,MenuEntity,MenuVisualPreferenceEntity,MenuVisualTemplateEntity,OrderDetailEntity,OrderEntity,PlateEntity,PromotionEntity,RestaurantChainEntity,RestaurantOperatorEntity,RestaurantSiteEntity,ReviewEntity,ScheduleEntity,TableEntity]),
];