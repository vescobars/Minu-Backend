import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlateEntity } from '../plate/plate.entity';
import { PromotionEntity } from '../promotion/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatePromotionService {

    constructor(
        @InjectRepository(PlateEntity)
        private readonly plateRepository: Repository<PlateEntity>,

        @InjectRepository(PromotionEntity)
        private readonly promotionRepository: Repository<PromotionEntity>
    ){}
}
