import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../../order-detail/order-detail.entity';
import { OrderEntity } from '../../order/order.entity';
import { TableEntity } from '../../table/table.entity';
import { PayModeEntity } from '../../pay-mode/pay-mode.entity';
import { AdressEntity } from 'src/adress/adress.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { ClientEntity } from 'src/client/client.entity';
import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { DescriptionTagEntity } from 'src/description-tag/description-tag.entity';
import { ImageEntity } from 'src/image/image.entity';
import { MenuEntity } from 'src/menu/menu.entity';
import { MenuVisualPreferenceEntity } from 'src/menu-visual-preferences/menu-visual-preferences.entity';
import { MenuVisualTemplateEntity } from 'src/menu-visual-template/menu-visual-template.entity';
import { PlateEntity } from 'src/plate/plate.entity';
import { PromotionEntity } from 'src/promotion/promotion.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from 'src/restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { scheduled } from 'rxjs';
import { ScheduleEntity } from 'src/schedule/schedule.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity,AdressEntity,CategoryEntity,ClientEntity,CoordinateEntity,DescriptionTagEntity,ImageEntity,MenuEntity,MenuVisualPreferenceEntity,MenuVisualTemplateEntity,PlateEntity,PromotionEntity,RestaurantChainEntity,RestaurantOperatorEntity,RestaurantSiteEntity,ReviewEntity,ScheduleEntity],
    synchronize: true,
    logging: false,
    keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity,AdressEntity,CategoryEntity,ClientEntity,CoordinateEntity,DescriptionTagEntity,ImageEntity,MenuEntity,MenuVisualPreferenceEntity,MenuVisualTemplateEntity,PlateEntity,PromotionEntity,RestaurantChainEntity,RestaurantOperatorEntity,RestaurantSiteEntity,ReviewEntity,ScheduleEntity]),
];