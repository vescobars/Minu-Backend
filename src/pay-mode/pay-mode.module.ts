import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayModeEntity } from './pay-mode.entity';
import { PayModeService } from './pay-mode.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayModeEntity])],
  providers: [PayModeService]
})
export class PayModeModule {}
