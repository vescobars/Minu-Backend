import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVisualTemplateController } from './menu-visual-template.controller';
import { MenuVisualTemplateEntity } from './menu-visual-template.entity';
import { MenuVisualTemplateService } from './menu-visual-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuVisualTemplateEntity])],
  providers: [MenuVisualTemplateService],
  controllers: [MenuVisualTemplateController],
})
export class MenuVisualTemplateModule {}
