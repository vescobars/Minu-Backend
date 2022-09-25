import { IsNotEmpty, IsString } from 'class-validator';
export class ImageDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string;
}
