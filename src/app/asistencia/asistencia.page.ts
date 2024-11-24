import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { lastValueFrom } from 'rxjs';
import { LogSysService } from '../services/log-sys.service';
import { SharedDataService } from '../shared-data.service'; 
import { QrService } from '../services/qr.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ConexionBDService } from '../services/conexion-bd.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  listaAsistencia: any[] = [];
  isSupported = false;
  barcodes: Barcode[] = [];

  usuario = "";
  porcentaje = 0;
  porcentaje_flg = true;

  
  constructor(
    private apiServiceService: ApiServiceService, 
    private logSysService: LogSysService,
    private sharedDataService: SharedDataService,
    private qrService: QrService,
    private conexionBDService: ConexionBDService
    
  ) { }

  ngOnInit() {
    this.mostrarAsistencia();

    BarcodeScanner.isSupported().then(async (result) => {
      this.isSupported = result.supported;
      if (this.isSupported) {
        await BarcodeScanner.installGoogleBarcodeScannerModule(); 
      }
    });
  }


  async controlAsistencia(){

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

  async mostrarAsistencia() {
    try {
      const usuarioLogueado = (await this.traeUsuario()).toString();
      console.log("usuario logueado api mostrar: ", usuarioLogueado.toString());
  
      let asistencia = this.apiServiceService.obtenerAsistencia(usuarioLogueado);
      let respuesta = await lastValueFrom(asistencia);
  
      console.log('Respuesta:', JSON.stringify(respuesta)); 
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);
      console.log(json);
  
      if (Array.isArray(respuesta) && respuesta.length > 0 && Array.isArray(respuesta[0])) {
        const listaAsistencia = respuesta[0];
  
        this.listaAsistencia = [];
        console.log(JSON.stringify(listaAsistencia));
  
        for (let asistencia of listaAsistencia) {
          const porcentaje_calculo = (asistencia.presente / 5) * 100;
  
          this.listaAsistencia.push({
            sigla: asistencia.curso_sigla,
            nombre_curso: asistencia.curso_nombre,
            presente: asistencia.presente,
            ausente: asistencia.ausente,
            porcentaje: porcentaje_calculo,
            porcentajeFlag: porcentaje_calculo >= 70 
          });
  
          console.log(porcentaje_calculo);
        };
  
        console.log('Lista asistencia:', JSON.stringify(this.listaAsistencia));
        this.logSysService.insertar_log(
          usuarioLogueado.toString(),
          "Api devolvió correctamente las asistencias",
          "OK"
        );
      } else {
        console.error('La respuesta no contiene datos válidos o está vacía.', respuesta);
      }
    } catch (error) {
      console.error('Error al obtener las sedes', JSON.stringify(error, null, 2));
      const usuarioLogueado = (await this.traeUsuario()).toString();
      this.logSysService.insertar_log(usuarioLogueado.toString(), "Error al obtener asistencia", "ERROR");
    }
  }
  

  calcularAsistencia(clasesAsistidas: number, totalClases: number): number {
    if (totalClases === 0) {
      return 0;
    }
    return (clasesAsistidas / totalClases) * 100;
  }
  
  scan(){
    this.qrService.validar_soporte();
    this.qrService.scan();
  }
}
