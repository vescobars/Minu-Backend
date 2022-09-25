import {IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID} from 'class-validator';
export class ReviewDto {

 @IsUUID()
 @IsNotEmpty()
 readonly id: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly score: number;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 
}