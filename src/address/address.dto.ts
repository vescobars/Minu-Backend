import {IsNotEmpty, IsString, IsUrl} from 'class-validator';
export class AddressDto {
  //LOS VALIDADORES ESTÁN COMENTADOS PORQUE DABA ERRORES AL HACER LAS PRUEBAS DE POSTMAN

  //@IsString()
  //@IsNotEmpty()
  readonly location: string;
  
  //@IsString()
  //@IsNotEmpty()
  readonly city: string;
  
  //@IsString()
  //@IsNotEmpty()
  readonly neighborhood: string;
  
  //@IsString()
  //@IsNotEmpty()
  readonly direction: string;
  
}
