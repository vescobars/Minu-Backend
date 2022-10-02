import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from 'src/review/review.dto';
import { ReviewEntity } from 'src/review/review.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReviewClientService } from './review-client.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReviewClientController {
  constructor(private readonly reviewClientService: ReviewClientService) {}

  @Get(':clientId/reviews/:reviewId')
  async findReviewByClientIdReviewId(
    @Param('clientId') clientId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewClientService.findReviewByClientIdReviewId(
      clientId,
      reviewId,
    );
  }

  @Get(':clientId/reviews')
  async findReviewsByClientId(@Param('clientId') clientId: string) {
    return await this.reviewClientService.findReviewsByClientId(clientId);
  }

  @Post(':clientId/reviews/:reviewId')
  async addReviewClient(
    @Param('clientId') clientId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewClientService.addReviewClient(clientId, reviewId);
  }

  @Put(':clientId/reviews')
  async associateReviewsClient(
    @Body() reviewsDto: ReviewDto[],
    @Param('clientId') clientId: string,
  ) {
    const reviews = plainToInstance(ReviewEntity, reviewsDto);
    return await this.reviewClientService.associateReviewsClient(
      clientId,
      reviews,
    );
  }

  @Delete(':clientId/reviews/:reviewId')
  @HttpCode(204)
  async deleteReviewClient(
    @Param('clientId') clientId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewClientService.deleteReviewClient(
      clientId,
      reviewId,
    );
  }
}
