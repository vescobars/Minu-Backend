import {IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl} from 'class-validator';
export class ClientDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    readonly phone: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
