import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantChainDto } from './create-restaurant-chain.dto';

export class UpdateRestaurantChainDto extends PartialType(CreateRestaurantChainDto) {}
