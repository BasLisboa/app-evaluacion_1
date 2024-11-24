import { Injectable } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';
import { LogSysService } from '../services/log-sys.service';
import { lastValueFrom } from 'rxjs';
import { ConexionBDService } from '../services/conexion-bd.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  isSupported = false;
  barcodes: Barcode[] = [];

  sigla:  string = '';
  nombre: string = '';
  fecha: string = '';

  usuario = "";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiServiceService: ApiServiceService,
    private logSysService: LogSysService,
    private conexionBDService: ConexionBDService
  ) { }
    
  
  async validar_soporte() {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      this.isSupported = true;
    } catch (error) {
      console.error('Error instalando el módulo:', error);
      this.isSupported = false;
    }
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



  async scan(): Promise<void> {
    this.validar_soporte();
    this.traeUsuario();
    try {
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }

      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);
      console.log(barcodes);

      const traza = barcodes[0].rawValue || '';
      const separador = traza.split('|');
      this.sigla = separador[0];
      this.nombre = separador[1]; 
      this.fecha = separador[2]; 

      console.log(this.sigla);
      console.log(this.nombre);
      console.log(this.fecha);
      
      console.log("flag ususario:" ,this.usuario);
      
      let asistencia = this.apiServiceService.marcarAsistencia(this.sigla,this.usuario,this.fecha);
      let respuesta = await lastValueFrom(asistencia); 

      console.log('Respuesta:', JSON.stringify(respuesta)); 
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);

      if(json.status === "success"){
        this.logSysService.insertar_log(this.usuario,json.message , json.status)
        console.log(JSON.stringify(json.status));
        console.log(JSON.stringify(json.message));
        this.router.navigate(['asistencia']);
        
      }else{
        this.logSysService.insertar_log(this.usuario,json.message , json.status)
        console.log(JSON.stringify(json.status));
        console.log(JSON.stringify(json.message));
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      await this.presentAlert();
      this.logSysService.insertar_log(this.usuario,"Error al registras asistencia", "ERROR")
    
    }
  }
  
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Activa los permisos para la camara.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
