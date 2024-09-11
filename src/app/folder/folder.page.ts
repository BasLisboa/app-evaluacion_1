//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Menu WEB BACK movil                                               */
//* Desarrollador: Bastian Lisboa & Daniel Galvex                               */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa & Daniel Galvex                               */
//* Fecha: 30-08-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 10-09-2024                                                           */
//* Descripcion: Modificacion para obtener usuario activo para mostrar          */
//* en menu web (BAS01).                                                        */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service'; 
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

  usuarioNombre: string = '';  

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private navCtrl: NavController, 
    private sharedDataService: SharedDataService,
    private router: Router,
    private menu: MenuController
  ) {}

  // INI-BAS01 - Función para obtener el usuario logueado
  ngOnInit() {
    this.obtenerUsuarioLogueado();  
  }

  obtenerUsuarioLogueado() {
    const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
    if (usuarioLogueado) {
      this.usuarioNombre = usuarioLogueado; 
    } else {
      this.usuarioNombre = 'Invitado'; 
    }
  }
  goLogin(){
    this.router.navigate(['login']);
  }

  goFolder(){
    this.router.navigate(['folder']);
  }
  // FIN-BAS01

  irAlPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }
}
