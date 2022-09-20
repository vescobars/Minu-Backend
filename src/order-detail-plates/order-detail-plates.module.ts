import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from '../order-detail/order-detail.entity';
import { OrderDetailPlatesService } from './order-detail-plates.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  providers: [OrderDetailPlatesService]
})
export class OrderDetailPlatesModule {}
