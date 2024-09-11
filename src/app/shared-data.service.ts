//*******************************************************************************/
//*                                   SecGar                                    */
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
//*******************************************************************************/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private usuarios: string[] = ['BAS', 'DAN', 'ADM'];
  private contrasenas: string[] = ['123', '456', '789'];
  private usuarioLogueado: string = ''; 

  constructor() {}

  getUsuarios(): string[] {
    return this.usuarios;
  }

  getContrasenas(): string[] {
    return this.contrasenas;
  }

  setUsuarioLogueado(usuario: string): void {
    this.usuarioLogueado = usuario;
  }

  getUsuarioLogueado(): string {
    return this.usuarioLogueado;
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
}
