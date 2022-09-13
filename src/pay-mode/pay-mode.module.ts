import { Module } from '@nestjs/common';
import { PayModeService } from './pay-mode.service';

@Module({
  providers: [PayModeService]
})
export class PayModeModule {}
