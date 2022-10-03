import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
import { RestaurantOperatorModule } from './restaurant-operator/restaurant-operator.module';
import { RestaurantChainModule } from './restaurant-chain/restaurant-chain.module';
import { RestaurantSiteModule } from './restaurant-site/restaurant-site.module';
import { ImageModule } from './image/image.module';
import { ScheduleModule } from './schedule/schedule.module';
import { OrderEntity } from './order/order.entity';
import { OrderDetailEntity } from './order-detail/order-detail.entity';
import { PayModeEntity } from './pay-mode/pay-mode.entity';
import { TableEntity } from './table/table.entity';
import { RestaurantChainEntity } from './restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from './restaurant-site/restaurant-site.entity';
import { ImageEntity } from './image/image.entity';
import { CategoryEntity } from './category/category.entity';
import { ClientEntity } from './client/client.entity';
import { DescriptionTagEntity } from './description-tag/description-tag.entity';
import { PlateEntity } from './plate/plate.entity';
import { PromotionEntity } from './promotion/promotion.entity';
import { ReviewEntity } from './review/review.entity';
import { ScheduleEntity } from './schedule/schedule.entity';
import { MenuEntity } from './menu/menu.entity';
import { RestaurantOperatorEntity } from './restaurant-operator/restaurant-operator.entity';
import { AddressEntity } from './address/address.entity';
import { ClientOrderModule } from './client-order/client-order.module';
import { ChainSiteModule } from './chain-site/chain-site.module';
import { SiteTableModule } from './site-table/site-table.module';
import { SiteOrderModule } from './site-order/site-order.module';
import { SiteReviewModule } from './site-review/site-review.module';
import { SiteOperatorModule } from './site-operator/site-operator.module';
import { SiteScheduleModule } from './site-schedule/site-schedule.module';
import { SiteMenuModule } from './site-menu/site-menu.module';
import { SiteAddressModule } from './site-address/site-address.module';
import { CategoryPlateModule } from './category-plate/category-plate.module';
import { PlateDescriptionTagModule } from './plate-description-tag/plate-description-tag.module';
import { PlateImageModule } from './plate-image/plate-image.module';
import { PlatePromotionModule } from './plate-promotion/plate-promotion.module';
import { OrderDetailPlatesModule } from './order-detail-plates/order-detail-plates.module';
import { OrderOrderDetailModule } from './order-order-detail/order-order-detail.module';
import { OrderPayModeModule } from './order-pay-mode/order-pay-mode.module';
import { OrderTableModule } from './order-table/order-table.module';
import { SitePromotionModule } from './site-promotion/site-promotion.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { ReviewClientModule } from './review-client/review-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nicolascelisjn24',
      database: 'minu',
      entities: [
        AddressEntity,
        CategoryEntity,
        ClientEntity,
        DescriptionTagEntity,
        ImageEntity,
        MenuEntity,
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
    AddressModule,
    CategoryModule,
    ClientModule,
    DescriptionTagModule,
    ImageModule,
    MenuModule,
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
    ClientOrderModule,
    SiteScheduleModule,
    ChainSiteModule,
    SiteTableModule,
    SiteOrderModule,
    SiteReviewModule,
    SiteOperatorModule,
    SiteScheduleModule,
    SiteMenuModule,
    SiteAddressModule,
    CategoryPlateModule,
    PlateDescriptionTagModule,
    PlateImageModule,
    PlatePromotionModule,
    OrderDetailPlatesModule,
    OrderOrderDetailModule,
    OrderPayModeModule,
    OrderTableModule,
    SitePromotionModule,
    UserModule,
    AuthModule,
    MenuCategoryModule,
    ReviewClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
