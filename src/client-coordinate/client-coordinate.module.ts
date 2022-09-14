import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/client.entity';
import { CoordinateEntity } from 'src/coordinate/coordinate.entity';
import { ClientCoordinateService } from './client-coordinate.service';

@Module({
  providers: [ClientCoordinateService],
  imports: [TypeOrmModule.forFeature([ClientEntity, CoordinateEntity])],
})
export class ClientCoordinateModule {}
