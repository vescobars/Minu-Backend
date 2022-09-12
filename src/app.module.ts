import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { PromotionModule } from './promotion/promotion.module';
import { PlateModule } from './plate/plate.module';
import { DescriptionTagModule } from './description-tag/description-tag.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { PayModeModule } from './pay-mode/pay-mode.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { TableModule } from './table/table.module';
import { OrderEntity } from './order/order.entity';
import { OrderDetailEntity } from './order-detail/order-detail.entity';
import { PayModeEntity } from './pay-mode/pay-mode.entity';
import { TableEntity } from './table/table.entity';
import { MenuModule } from './menu/menu.module';
import { AdressModule } from './adress/adress.module';
import { CoordinateModule } from './coordinate/coordinate.module';
import { RestaurantOperatorModule } from './restaurant-operator/restaurant-operator.module';
import { MenuEntity } from './menu/menu.entity';
import { CoordinateEntity } from './coordinate/coordinate.entity';
import { RestaurantOperatorEntity } from './restaurant-operator/restaurant-operator.entity';
import { AdressEntity } from './adress/adress.entity';
import { RestaurantChainModule } from './restaurant-chain/restaurant-chain.module';
import { RestaurantSiteModule } from './restaurant-site/restaurant-site.module';
import { ImageModule } from './image/image.module';
import { MenuVisualPreferencesModule } from './menu-visual-preferences/menu-visual-preferences.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantChainEntity } from './restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from './restaurant-site/restaurant-site.entity';
import { ImageEntity } from './image/image.entity';
import { MenuVisualPreferenceEntity } from './menu-visual-preferences/menu-visual-preferences.entity';

@Module({
  imports: [
    MenuModule, 
    CategoryModule, 
    PromotionModule, 
    PlateModule,  
    DescriptionTagModule, 
    ReviewModule,
    OrderModule, 
    PayModeModule, 
    OrderDetailModule, 
    TableModule,
    AdressModule,
    CoordinateModule,
    RestaurantOperatorModule,
    RestaurantChainModule,
    RestaurantSiteModule,
    ImageModule,
    MenuVisualPreferencesModule,
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      entities: [
        OrderEntity, 
        OrderDetailEntity, 
        PayModeEntity, 
        TableEntity, 
        MenuEntity, 
        CoordinateEntity, 
        RestaurantOperatorEntity, 
        AdressEntity,
        RestaurantChainEntity,
        RestaurantSiteEntity,
        ImageEntity,
        MenuVisualPreferenceEntity,
        
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
