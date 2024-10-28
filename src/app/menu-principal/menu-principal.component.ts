//*******************************************************************************/
//*                                   Duoc                                      */
//*******************************************************************************/
//* Proyecto: Menu movil                                                        */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 30-08-2024                                                           */
//* Descripcion: Creacion de menu                                               */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa (BAS01)                                       */
//* Fecha: 22-10-2024                                                           */
//* Descripcion: Se cambia logica para cerrar sesion con bdd                    */
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedDataService } from 'src/app/shared-data.service';
import { SesionActivaService } from '../services/sesion-activa.service';



@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent  implements OnInit {

  usuarioNombre: string = ''; 

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private menuCtrl: MenuController,
    private sesionActivaService: SesionActivaService
  ) { }

  ngOnInit() {
    this.traeUsuario();
  }

  //BAS01-INI

  //SE COMENTA LOGICA ANTERIOR

  /*obtenerUsuarioLogueado() {
    const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
    if (usuarioLogueado) {
      this.usuarioNombre = usuarioLogueado; 
    } else {
      this.usuarioNombre = 'Invitado'; 
    }
  }*/



  //NUEVA LOGICA
  async traeUsuario(){
    const usuarioActivo = await this.sesionActivaService.verificarSesionActiva();
    if(usuarioActivo){
      this.usuarioNombre = usuarioActivo;
    }
  }

  goLogin(){
    const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
    this.menuCtrl.close('main-content');
    this.sesionActivaService.updateFlag(0,usuarioLogueado);
    this.router.navigate(['login']); 
  }

  //BAS01-FIN
  goFolder(){
    this.menuCtrl.close('main-content');
    this.router.navigate(['folder']);
  }
  
}
