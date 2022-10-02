import {IsDate, IsNotEmpty, IsString} from 'class-validator';
export class MenuDto {
  //LOS VALIDADORES ESTÁN COMENTADOS PORQUE DABA ERRORES AL HACER LAS PRUEBAS DE POSTMAN

  //@IsString()
  //@IsNotEmpty()
  readonly date: string;

  //@IsString()
  //@IsNotEmpty()
  readonly file: string;

}