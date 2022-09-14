import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressEntity } from '../../adress/adress.entity';
import { CategoryEntity } from '../../category/category.entity';
import { CoordinateEntity } from '../../coordinate/coordinate.entity';
import { DescriptionTagEntity } from '../../description-tag/description-tag.entity';
import { ImageEntity } from '../../image/image.entity';
import { MenuVisualPreferenceEntity } from '../../menu-visual-preferences/menu-visual-preferences.entity';
import { MenuVisualTemplateEntity } from '../../menu-visual-template/menu-visual-template.entity';
import { MenuEntity } from '../../menu/menu.entity';
import { OrderDetailEntity } from '../../order-detail/order-detail.entity';
import { OrderEntity } from '../../order/order.entity';
import { PlateEntity } from '../../plate/plate.entity';
import { PromotionEntity } from '../../promotion/promotion.entity';
import { RestaurantChainEntity } from '../../restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from '../../restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from '../../restaurant-site/restaurant-site.entity';
import { ReviewEntity } from '../../review/review.entity';
import { ScheduleEntity } from '../../schedule/schedule.entity';
import { TableEntity } from '../../table/table.entity';
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