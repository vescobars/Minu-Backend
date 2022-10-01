import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class AddressDto {
  @IsString()
  @IsNotEmpty()
  readonly location: string;
  
  @IsString()
  @IsNotEmpty()
  readonly city: string;
  
  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;
  
  @IsString()
  @IsNotEmpty()
  readonly direction: string;
  
}
