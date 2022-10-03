import {IsBoolean, IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class RestaurantOperatorDto {
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;
  
  @IsString()
  @IsNotEmpty()
  readonly cellphone: string;
  
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly active: string;

  @IsString()
  @IsNotEmpty()
  readonly imageUrl: string;
}
