import {IsNotEmpty, IsString, IsUrl, IsUUID} from 'class-validator';
export class DescriptionTagDto {

 @IsUUID()
 @IsNotEmpty()
 readonly id: string;
    
 @IsString()
 @IsNotEmpty()
 readonly name: string;
}