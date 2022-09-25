import { Module } from '@nestjs/common';
import { CategoryPlateService } from './category-plate.service';
import { CategoryPlateController } from './category-plate.controller';

@Module({
  providers: [CategoryPlateService],
  controllers: [CategoryPlateController]
})
export class CategoryPlateModule {}
