import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuVisualPreferenceDto } from './create-menu-visual-preference.dto';

export class UpdateMenuVisualPreferenceDto extends PartialType(CreateMenuVisualPreferenceDto) {}
