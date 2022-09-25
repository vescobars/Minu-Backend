import {IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';
export class PromotionDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly startDate: string;
 
 @IsString()
 @IsNotEmpty()
 readonly endDate: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly discount: number;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
}
