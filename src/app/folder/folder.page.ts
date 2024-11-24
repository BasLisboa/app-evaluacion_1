//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Menu WEB BACK movil                                               */
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 30-08-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 10-09-2024                                                           */
//* Descripcion: Modificacion para obtener usuario activo para mostrar          */
//* en menu web (BAS01).                                                        */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 19-11-2024                                                           */
//* Descripcion: Modificacion a estilo y se aplica QR                           */
//* en menu web (BAS02).                                                        */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service'; 
import { MenuController } from '@ionic/angular';
import { QrService } from '../services/qr.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ConexionBDService } from '../services/conexion-bd.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

  usuario = '';

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  isSupported = false;
  barcodes: Barcode[] = [];


  constructor( 
    private conexionBDService: ConexionBDService,
    private router: Router,
    private menuCtrl: MenuController,
    private qrService: QrService
  ) {}

  // INI-BAS01 - Función para obtener el usuario logueado
  ngOnInit() {
    this.traeUsuario();
    BarcodeScanner.isSupported().then(async (result) => {
      this.isSupported = result.supported;
      if (this.isSupported) {
        await BarcodeScanner.installGoogleBarcodeScannerModule(); 
      }
    });
  }

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
    this.router.navigate(['login']); 
  }

  goFolder(){
    this.menuCtrl.close('main-content');
    this.router.navigate(['folder']);
  }

  ir_ass(){
    this.router.navigate(['asistencia']);
  }
  // FIN-BAS01

  //INI-BAS02
  scan(){
    this.qrService.validar_soporte();
    this.qrService.scan();
  }
  //FIN-BAS02

}
