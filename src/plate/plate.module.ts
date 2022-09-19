import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateEntity } from './plate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PlateService],
  imports: [TypeOrmModule.forFeature([PlateEntity])],
})
export class PlateModule {}
