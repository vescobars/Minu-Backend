import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReviewDto } from './review.dto';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';

@Controller('reviews')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':reviewId')
  async findOne(@Param('reviewId') reviewId: string) {
    return await this.reviewService.findOne(reviewId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() reviewDto: ReviewDto) {
    const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
    return await this.reviewService.create(review);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':reviewId')
  async update(@Param('reviewId') reviewId: string, @Body() reviewDto: ReviewDto) {
    const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
    return await this.reviewService.update(reviewId, review);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':reviewId')
  @HttpCode(204)
  async delete(@Param('reviewId') reviewId: string) {
    return await this.reviewService.delete(reviewId);
  }
}
