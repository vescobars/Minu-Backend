import {IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID} from 'class-validator';
export class CategoryDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsUUID()
 @IsNotEmpty()
 readonly id: string;
 
}
