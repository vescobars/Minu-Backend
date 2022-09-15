import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';
import { ScheduleEntity } from 'src/schedule/schedule.entity';
import { MenuVisualTemplateEntity } from 'src/menu-visual-template/menu-visual-template.entity';
import { RestaurantChainEntity } from 'src/restaurant-chain/restaurant-chain.entity';
import { RestaurantSiteEntity } from 'src/restaurant-site/restaurant-site.entity';
import { ImageEntity } from 'src/image/image.entity';
import { MenuVisualPreferenceEntity } from 'src/menu-visual-preferences/menu-visual-preferences.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      ClientEntity,
      ScheduleEntity,
      MenuVisualTemplateEntity,
      RestaurantChainEntity,
      RestaurantSiteEntity,
      ImageEntity,
      MenuVisualPreferenceEntity,
    ],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([
    ClientEntity,
    ScheduleEntity,
    MenuVisualTemplateEntity,
    RestaurantChainEntity,
    RestaurantSiteEntity,
    ImageEntity,
    MenuVisualPreferenceEntity,
  ]),
];
