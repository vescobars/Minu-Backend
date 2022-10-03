import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  providers: [TableService,RolesGuard,UserService, AuthService, JwtService],
  controllers: [TableController]
})
export class TableModule {}

