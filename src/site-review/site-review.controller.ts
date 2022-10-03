import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors, UseGuards} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from '../review/review.dto';
import { ReviewEntity } from '../review/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { HasRoles } from '../shared/security/roles.decorators';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { SiteReviewService } from './site-review.service';

@Controller('sites')
@UseInterceptors(BusinessErrorsInterceptor)
export class SiteReviewController {
    constructor(private readonly siteReviewService: SiteReviewService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':siteId/reviews')
  async findReviewsBySiteId(@Param('siteId') siteId: string) {
    return await this.siteReviewService.findReviewsBySiteId(siteId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':siteId/reviews/:reviewId')
  async addReviewSite(
    @Param('siteId') siteId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.siteReviewService.addReviewSite(siteId, reviewId);
  }
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':siteId/reviews/:reviewId')
  @HttpCode(204)
  async deleteReviewSite(
    @Param('siteId') siteId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.siteReviewService.deleteReviewSite(siteId, reviewId);
  }
}
