import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  imports: [RestaurantChainModule, RestaurantSiteModule, ImageModule, MenuVisualPreferencesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nicolascelisjn24',
      database: 'minu',
      entities: [RestaurantChainEntity, RestaurantSiteEntity, ImageEntity, MenuVisualPreferenceEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
