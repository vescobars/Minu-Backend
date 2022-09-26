import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayModeEntity } from './pay-mode.entity';
import { PayModeService } from './pay-mode.service';
import { PayModeController } from './pay-mode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PayModeEntity])],
  providers: [PayModeService],
  controllers: [PayModeController]
})
export class PayModeModule {}
