import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors,} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from '../review/review.dto';
import { ReviewEntity } from '../review/review.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteReviewService } from './site-review.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteReviewController {
    constructor(private readonly siteReviewService: SiteReviewService) {}

  @Get(':siteId/reviews/:reviewId')
  async findReviewBySiteIdReviewId(
    @Param('siteId') siteId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.siteReviewService.findReviewBySiteIdReviewId(
      siteId,
      reviewId,
    );
  }

  @Get(':siteId/reviews')
  async findReviewsBySiteId(@Param('siteId') siteId: string) {
    return await this.siteReviewService.findReviewsBySiteId(siteId);
  }

  @Post(':siteId/reviews/:reviewId')
  async addReviewSite(
    @Param('siteId') siteId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.siteReviewService.addReviewSite(siteId, reviewId);
  }
  
 @Put(':siteId/reviews')
  async associateReviewsSite(
    @Body() reviewsDto: ReviewDto[],
    @Param('siteId') siteId: string,
  ) {
    const reviews = plainToInstance(ReviewEntity, reviewsDto);
    return await this.siteReviewService.associateReviewsSite(
      siteId,
      reviews,
    );
  }

  @Delete(':siteId/reviews/:reviewId')
  @HttpCode(204)
  async deleteReviewSite(
    @Param('siteId') siteId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.siteReviewService.deleteReviewSite(siteId, reviewId);
  }
}
