import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { ReviewEntity } from '../review/review.entity';
import { ReviewClientService } from './review-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, ClientEntity])],
  providers: [ReviewClientService],
})
export class ReviewClientModule {}
