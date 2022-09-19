import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './category/category.module';
import { PromotionModule } from './promotion/promotion.module';
import { PlateModule } from './plate/plate.module';
import { DescriptionTagModule } from './description-tag/description-tag.module';
import { ClientModule } from './client/client.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { PayModeModule } from './pay-mode/pay-mode.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { AddressModule } from './address/address.module';
import { CoordinateModule } from './coordinate/coordinate.module';
import { RestaurantOperatorModule } from './restaurant-operator/restaurant-operator.module';
import { RestaurantChainModule } from './restaurant-chain/restaurant-chain.module';
import { RestaurantSiteModule } from './restaurant-site/restaurant-site.module';
import { ImageModule } from './image/image.module';
import { MenuVisualPreferencesModule } from './menu-visual-preferences/menu-visual-preferences.module';
import { MenuVisualTemplateModule } from './menu-visual-template/menu-visual-template.module';
import { ScheduleModule } from './schedule/schedule.module';
import { OrderEntity } from './order/order.entity';
import { OrderDetailEntity } from './order-detail/order-detail.entity';
import { PayModeEntity } from './pay-mode/pay-mode.entity';
import { TableEntity } from './table/table.entity';
import { RestaurantChainEntity } from './restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from './restaurant-site/restaurant-site.entity';
import { ImageEntity } from './image/image.entity';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences/menu-visual-preferences.entity';
import { CategoryEntity } from './category/category.entity';
import { ClientEntity } from './client/client.entity';
import { DescriptionTagEntity } from './description-tag/description-tag.entity';
import { MenuVisualTemplateEntity } from './menu-visual-template/menu-visual-template.entity';
import { PlateEntity } from './plate/plate.entity';
import { PromotionEntity } from './promotion/promotion.entity';
import { ReviewEntity } from './review/review.entity';
import { ScheduleEntity } from './schedule/schedule.entity';
import { MenuEntity } from './menu/menu.entity';
import { CoordinateEntity } from './coordinate/coordinate.entity';
import { RestaurantOperatorEntity } from './restaurant-operator/restaurant-operator.entity';
import { AddressEntity } from './address/address.entity';
import { ClientImageModule } from './client-image/client-image.module';
import { ClientOrderModule } from './client-order/client-order.module';
import { ClientCoordinateModule } from './client-coordinate/client-coordinate.module';
import { ChainSiteModule } from './chain-site/chain-site.module';
import { SiteTableModule } from './site-table/site-table.module';
import { SiteOrderModule } from './site-order/site-order.module';
import { SiteReviewModule } from './site-review/site-review.module';
import { SiteOperatorModule } from './site-operator/site-operator.module';
import { SiteScheduleModule } from './site-schedule/site-schedule.module';
import { SiteMenuModule } from './site-menu/site-menu.module';
import { SiteAddressModule } from './site-address/site-address.module';

@Module({
  imports: [
    AddressModule,
    CategoryModule,
    ClientModule,
    CoordinateModule,
    DescriptionTagModule,
    ImageModule,
    MenuModule,
    MenuVisualPreferencesModule,
    MenuVisualTemplateModule,
    OrderModule,
    OrderDetailModule,
    PayModeModule,
    PlateModule,
    PromotionModule,
    RestaurantChainModule,
    RestaurantOperatorModule,
    RestaurantSiteModule,
    ReviewModule,
    ScheduleModule,
    TableModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres123',
      database: 'db',
      entities: [
        AddressEntity,
        CategoryEntity,
        ClientEntity,
        CoordinateEntity,
        DescriptionTagEntity,
        ImageEntity,
        MenuEntity,
        MenuVisualPreferenceEntity,
        MenuVisualTemplateEntity,
        OrderEntity,
        OrderDetailEntity,
        PayModeEntity,
        PlateEntity,
        PromotionEntity,
        RestaurantChainEntity,
        RestaurantOperatorEntity,
        RestaurantSiteEntity,
        ReviewEntity,
        ScheduleEntity,
        TableEntity,
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),

    ClientImageModule,

    ClientOrderModule,

    SiteScheduleModule,

    ClientCoordinateModule,

    ChainSiteModule,

    SiteTableModule,

    SiteOrderModule,

    SiteReviewModule,

    SiteOperatorModule,

    SiteScheduleModule,

    SiteMenuModule,

    SiteAddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
