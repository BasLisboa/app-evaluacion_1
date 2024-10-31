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

  ruta_api: string = 'https://www.s2-studio.cl';
  

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string) {
    let objeto_log: any = {};
    objeto_log.correo = correo;
    objeto_log.contrasena = contrasena;

    console.log(objeto_log.mail);
    console.log(objeto_log.pass)
    return this.http.post(this.ruta_api + '/api_duoc/usuario/usuario_login', objeto_log)
  }


  crearUsuario(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    let objeto_cre: any = {};

    objeto_cre.correo = correo;
    objeto_cre.contrasena = contrasena;
    objeto_cre.nombre = nombre;
    objeto_cre.apellido = apellido;
    objeto_cre.carrera = carrera;
    
    return this.http.post(this.ruta_api + '/api_duoc/usuario/usuario_almacenar', objeto_cre);
  }

  obtenerSede(){
    return this.http.get(this.ruta_api + '/api_duoc/usuario/sedes_obtener').pipe();
  }

  cambioClave(correo: string, contrasena: string, carrera: string){
    let cambio_clv: any = {};

    cambio_clv.correo = correo;
    cambio_clv.contrasena = contrasena;
    cambio_clv.carrera = carrera;

    return this.http.patch(this.ruta_api + '/api_duoc/usuario/usuario_modificar', cambio_clv);
  }
}




