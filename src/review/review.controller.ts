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
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/enums/role.enum';
import { HasRoles } from 'src/shared/security/roles.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReviewDto } from './review.dto';
import { ReviewEntity } from './review.entity';
import { ReviewService } from './review.service';

@Controller('reviews')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }

  @HasRoles(Role.Reader)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':reviewId')
  async findOne(@Param('reviewId') reviewId: string) {
    return await this.reviewService.findOne(reviewId);
  }

  // @UseGuards(JwtAuthGuard)
  // @HasRoles(Role.Writer)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() reviewDto: ReviewDto) {
    const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
    return await this.reviewService.create(review);
  }

  @UseGuards(JwtAuthGuard)
  @HasRoles(Role.Writer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':reviewId')
  async update(
    @Param('reviewId') reviewId: string,
    @Body() reviewDto: ReviewDto,
  ) {
    const review: ReviewEntity = plainToInstance(ReviewEntity, reviewDto);
    return await this.reviewService.update(reviewId, review);
  }

  @HasRoles(Role.Deleter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':reviewId')
  @HttpCode(204)
  async delete(@Param('reviewId') reviewId: string) {
    return await this.reviewService.delete(reviewId);
  }
}
