import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { PayModeModule } from './pay-mode/pay-mode.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [OrderModule, PayModeModule, OrderDetailModule, TableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
