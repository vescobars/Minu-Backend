import { Module } from '@nestjs/common';
import { CategoryPlateService } from './category-plate.service';

@Module({
  providers: [CategoryPlateService]
})
export class CategoryPlateModule {}
