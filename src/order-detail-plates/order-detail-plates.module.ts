import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  providers: [OrderDetailService]
})
export class OrderDetailPlatesModule {}
