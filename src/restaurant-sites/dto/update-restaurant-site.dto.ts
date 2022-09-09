import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantSiteDto } from './create-restaurant-site.dto';

export class UpdateRestaurantSiteDto extends PartialType(CreateRestaurantSiteDto) {}
