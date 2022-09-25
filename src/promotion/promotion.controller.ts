import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReviewService } from '../review/review.service';
import { ReviewEntity } from '../review/review.entity';
import { ReviewDto } from '../review/review.dto';

@Controller('promotions')
@UseInterceptors(BusinessErrorsInterceptor)
export class PromotionController {
    constructor(private readonly reviewService: ReviewService) {}

    @Get()
    async findAll() {
      return await this.reviewService.findAll();
    }
  
    @Get(':reviewId')
    async findOne(@Param('reviewId') reviewId: string) {
      return await this.reviewService.findOne(reviewId);
    }
  
    @Post()
    async create(@Body() reviewDto: ReviewDto) {
      const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
      return await this.reviewService.create(review);
    }
  
    @Put(':reviewId')
    async update(@Param('reviewId') reviewId: string, @Body() reviewDto: ReviewDto) {
      const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
      return await this.reviewService.update(reviewId, review);
    }
  
    @Delete(':reviewId')
    @HttpCode(204)
    async delete(@Param('reviewId') reviewId: string) {
      return await this.reviewService.delete(reviewId);
    }
}
