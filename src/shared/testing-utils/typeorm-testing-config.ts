import { OrderDetailEntity } from '../../order-detail/order-detail.entity';
import { OrderEntity } from '../../order/order.entity';
import { TableEntity } from '../../table/table.entity';
import { PayModeEntity } from '../../pay-mode/pay-mode.entity';
import { AddressEntity } from '../../address/address.entity';
import { ClientEntity } from '../../client/client.entity';
import { ImageEntity } from '../../image/image.entity';
import { MenuEntity } from '../../menu/menu.entity';
import { RestaurantChainEntity } from '../../restaurant-chain/restaurant-chain.entity';
import { RestaurantOperatorEntity } from '../../restaurant-operator/restaurant-operator.entity';
import { RestaurantSiteEntity } from '../../restaurant-site/restaurant-site.entity';
import { ScheduleEntity } from '../../schedule/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../category/category.entity';
import { DescriptionTagEntity } from '../../description-tag/description-tag.entity';
import { PromotionEntity } from '../../promotion/promotion.entity';
import { PlateEntity } from '../../plate/plate.entity';
import { ReviewEntity } from '../../review/review.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      PayModeEntity,
      TableEntity,
      OrderEntity,
      OrderDetailEntity,
      AddressEntity,
      CategoryEntity,
      ClientEntity,
      DescriptionTagEntity,
      ImageEntity,
      MenuEntity,
      PlateEntity,
      PromotionEntity,
      RestaurantChainEntity,
      RestaurantOperatorEntity,
      RestaurantSiteEntity,
      ReviewEntity,
      ScheduleEntity,
      CategoryEntity,
      DescriptionTagEntity],
    synchronize: true,
    keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([PayModeEntity,TableEntity,OrderEntity,OrderDetailEntity,AddressEntity,CategoryEntity,ClientEntity,DescriptionTagEntity,ImageEntity,MenuEntity,PlateEntity,PromotionEntity,RestaurantChainEntity,RestaurantOperatorEntity,RestaurantSiteEntity,ReviewEntity,ScheduleEntity]),
];
