import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';
// import { ReviewController } from './review.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  providers: [ReviewService],
  // controllers: [ReviewController]
})
export class ReviewModule {}
