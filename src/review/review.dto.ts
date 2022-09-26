import {IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID} from 'class-validator';
export class ReviewDto {
 
 @IsNumber()
 @IsNotEmpty()
 readonly score: number;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 
}