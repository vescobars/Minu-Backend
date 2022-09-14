import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuVisualTemplateEntity } from './menu-visual-template.entity';
import { MenuVisualTemplateService } from './menu-visual-template.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuVisualTemplateEntity])],
  providers: [MenuVisualTemplateService],
})
export class MenuVisualTemplateModule {}
