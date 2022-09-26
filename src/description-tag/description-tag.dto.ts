import {IsNotEmpty, IsString, IsUrl, IsUUID} from 'class-validator';
export class DescriptionTagDto {

    
 @IsString()
 @IsNotEmpty()
 readonly name: string;
}