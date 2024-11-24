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
import { SesionActivaService } from '../services/sesion-activa.service';
import { ConexionBDService } from '../services/conexion-bd.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent  implements OnInit {

  usuario = ''; 

  constructor(
    private conexionBDService: ConexionBDService,
    private router: Router,
    private menuCtrl: MenuController,
    private sesionActivaService: SesionActivaService
  ) { }

  ngOnInit() {
    this.traeUsuario()
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

  async traeUsuario(): Promise<string> {
    const db = this.conexionBDService.getDB();
    if (!db) {
      console.error("Base de datos no disponible.");
      return "error";
    }
  
    try {
      const resultado = await db.executeSql(`SELECT SES_COR FROM TB_SES_LOG WHERE SES_FLG = 1`, []);
      if (resultado.rows.length > 0 ) {
        const sesionUsuario = resultado.rows.item(0);
        console.log("Usuario activo encontrado:", sesionUsuario.SES_COR);
        
        const usuario = sesionUsuario.SES_COR.toString();

        this.usuario = usuario.toString();

        console.log(this.usuario);
        
        return this.usuario.toString();
        
      } else {
        console.log("No hay sesión activa con SES_FLG = 1 en TB_SES_LOG.");
        return "error";
      }
    } catch (error: any) {
      console.error("Error al verificar la sesión activa:", error.message || error);
      return "error";
    }
  }

  goLogin(){
    this.menuCtrl.close('main-content');
    this.traeUsuario();
    this.sesionActivaService.updateFlag(0,this.usuario);
    this.router.navigate(['login']); 
  }

  //BAS01-FIN
  goFolder(){
    this.menuCtrl.close('main-content');
    this.router.navigate(['folder']);
  }
  
}
