//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: Servicio conetenedor de arrays                                    */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 03-09-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 03-09-2024                                                           */
//* Descripcion: Creacion de servicios arrays y cache                           */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 18-10-2024                                                           */
//* Descripcion: Se modifica servicio por base de datos (BAS01)                 */
//*******************************************************************************/
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

//BAS01-INI     
export class SharedDataService {
  //SE CAMBIAN DE STRING[] A STRING ESTAS 3 VARIABLES.

  private usuarioLogueado: string = ''; 
  usuario: string = '';

  constructor(
  ) {}

  setUsuarioLogueado(usuario: string): void {
    this.usuarioLogueado = usuario;
  }

  getUsuarioLogueado(): string {
    return this.usuarioLogueado;
  }


 

  
  //SE COMENTA CODIGO NO UTILIZADO
  /*
  //private usuarios: string = '';
  //private contrasenas: string = '';

  getUsuarios(): string {
    return this.usuarios;
  }

  getContrasenas(): string {
    return this.contrasenas;
  }

  addUsuario(usuario: string): void {
    this.usuarios.push(usuario);
  }

  addContrasena(contrasena: string): void {
    this.contrasenas.push(contrasena);
  }

  updateContrasena(indice: number, nuevaContrasena: string): void {
    if (indice >= 0 && indice < this.contrasenas.length) {
      this.contrasenas[indice] = nuevaContrasena;
    }
  }
  */
}
