import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateEntity } from './plate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PlateController } from './plate.controller';

@Module({
  providers: [PlateService],
  imports: [TypeOrmModule.forFeature([PlateEntity])],
  // controllers: [PlateController],
})
export class PlateModule {}
