//*******************************************************************************/
//*                                   Duoc                                      */
//*******************************************************************************/
//* Proyecto: Servicios api                                                     */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 18-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 18-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/-->

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  ruta_login: string = 'https://www.s2-studio.cl';
  

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string) {
    let objeto_log: any = {};
      objeto_log.mail = correo;
      objeto_log.pass = contrasena;

      console.log(objeto_log.mail);
      console.log(objeto_log.pass)
    return this.http.post(this.ruta_login + '/api_duoc/usuario/usuario_login', objeto_log)
  }

  crearUsuario(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    let objeto_cre: any = {};

    objeto_cre.mail = correo;
    objeto_cre.pass = contrasena;
    objeto_cre.nombre = nombre;
    objeto_cre.apellido = apellido;
    objeto_cre.carrera = carrera;
    
    return this.http.post(this.ruta_login + '/api_duoc/usuario/usuario_almacenar', objeto_cre);
  }
}




