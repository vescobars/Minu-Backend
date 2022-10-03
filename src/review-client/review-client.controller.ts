import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from 'src/review/review.dto';
import { ReviewEntity } from 'src/review/review.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Role } from '../enums/role.enum';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { HasRoles } from '../shared/security/roles.decorators';
import { ReviewClientService } from './review-client.service';

@Controller('clients')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReviewClientController {
  constructor(private readonly reviewClientService: ReviewClientService) {}

  @Get(':clientId/reviews/:reviewId')
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findReviewsByClientId(@Param('clientId') clientId: string) {
    return await this.reviewClientService.findReviewsByClientId(clientId);
  }

  @Post(':clientId/reviews/:reviewId')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addReviewClient(
    @Param('clientId') clientId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return await this.reviewClientService.addReviewClient(clientId, reviewId);
  }

  @Put(':clientId/reviews')
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
