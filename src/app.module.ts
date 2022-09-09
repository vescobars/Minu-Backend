import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantChainModule } from './restaurant-chain/restaurant-chain.module';
import { RestaurantSitesModule } from './restaurant-sites/restaurant-sites.module';
import { RestaurantChainsModule } from './restaurant-chains/restaurant-chains.module';
import { ImagesModule } from './images/images.module';
import { MenuVisualPreferencesModule } from './menu-visual-preferences/menu-visual-preferences.module';

@Module({
  imports: [RestaurantChainModule, RestaurantSitesModule, RestaurantChainsModule, ImagesModule, MenuVisualPreferencesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
