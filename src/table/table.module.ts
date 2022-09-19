import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableService } from './table.service';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  providers: [TableService]
})
export class TableModule {}

