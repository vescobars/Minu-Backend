import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  providers: [OrderDetailService]
})
export class OrderDetailModule {}
