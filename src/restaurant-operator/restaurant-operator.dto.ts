import {IsBoolean, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class RestaurantOperatorDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;
  
  @IsString()
  @IsNotEmpty()
  readonly cellpnone: string;
  
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  
  @IsUrl()
  @IsNotEmpty()
  readonly role: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly active: string;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;
}
