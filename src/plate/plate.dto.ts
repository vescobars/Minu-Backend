import {IsNotEmpty, IsNumber, IsString, IsUUID} from 'class-validator';
import { isNumberObject } from 'util/types';
export class PlateDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 @IsNumber()
 @IsNotEmpty()
 readonly value: number;
 
 @IsString()
 @IsNotEmpty()
 readonly notes: string;
}
