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
import { Router } from '@angular/router';
import { SesionActivaService } from '../app/services/sesion-activa.service';
import { CreacionDBService } from '../app/services/creacion-db.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard{

  constructor(
    private sesionActivaService: SesionActivaService,
    private router: Router,
    private creacionDBService: CreacionDBService
  ) {}

  async canActivate(): Promise<boolean> {
    await this.creacionDBService.inicializarBD();
    const usuarioActivo = await this.sesionActivaService.verificarSesionActiva();
    console.log(usuarioActivo);
    
    if (usuarioActivo == true) {
      this.router.navigate(['folder']);
      return true; 
    } else {
      this.router.navigate(['login']); 
      return false;
    }
  }
}
