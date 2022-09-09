import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressModule } from './adress/adress.module';
import { CoordinateModule } from './coordinate/coordinate.module';
import { RestaurantOperatorModule } from './restaurant-operator/restaurant-operator.module';


@Module({
  imports: [MenuModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      entities: [MenuModule, CoordinateModule, RestaurantOperatorModule, AdressModule],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    AdressModule,
    CoordinateModule,
    RestaurantOperatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
