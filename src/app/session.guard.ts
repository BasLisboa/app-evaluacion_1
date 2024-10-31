//*******************************************************************************/
//*                                   Duoc                                      */
//*******************************************************************************/
//* Proyecto: Guard para redirigir por sesion                                   */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 29-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 29-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*******************************************************************************/
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionActivaService } from '../app/services/sesion-activa.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(
    private sesionActivaService: SesionActivaService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const usuarioActivo = await this.sesionActivaService.verificarSesionActiva();
    
    if (usuarioActivo) {
      return true; 
    } else {
      this.router.navigate(['login']); 
      return false;
    }
  }
}
