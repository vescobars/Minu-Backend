import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { CoordinateEntity } from '../coordinate/coordinate.entity';
import { ClientCoordinateController } from './client-coordinate.controller';
import { ClientCoordinateService } from './client-coordinate.service';

@Module({
  providers: [ClientCoordinateService],
  imports: [TypeOrmModule.forFeature([ClientEntity, CoordinateEntity])],
  controllers: [ClientCoordinateController],
})
export class ClientCoordinateModule {}
