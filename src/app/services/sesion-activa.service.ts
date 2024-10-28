import { Injectable } from '@angular/core';
import { ConexionBDService } from '../services/conexion-bd.service';
import { LogSysService } from '../services/log-sys.service';


@Injectable({
  providedIn: 'root'
})
export class SesionActivaService {

  constructor(
    private conexionBDService: ConexionBDService,
    private logSysService: LogSysService
  ) { }


  async updateFlag(opcion: number, usuario: string){
    console.log("Entro a updateFlag");
    
    if(opcion == 1){
      try {
        
        const db = this.conexionBDService.getDB();
        
        if (db) {
          
          const sysdate = new Date(); 
  
          const options = { timeZone: 'America/Santiago', hour12: false };
          const fecha = sysdate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }); //dd/mm/yyyy
          const hora = sysdate.toLocaleTimeString('es-CL', options);  //hh:mm:ss
          const fechaHoraLocal = `${fecha} ${hora}`;
          
          await db.executeSql(`UPDATE TB_SES_LOG SET SES_FLG = ?, SES_TIM = ?`, [0, fechaHoraLocal]);
          

          await db.executeSql(`UPDATE TB_SES_LOG SET SES_FLG = ?, SES_TIM = ? WHERE SES_COR = ?`, [1, fechaHoraLocal, usuario]);
          console.log('Flag cambiada a 1 correctamente');
          this.logSysService.insertar_log(usuario, ": Flag cambiada a 1 correctamente ", "OK");
        } else {
          console.error('La base de datos no está disponible.');
        }
      } catch (error) {
        console.error('Error al actualizar el flag:', error);
      }
    }else if(opcion == 0){
      try {
        const db = this.conexionBDService.getDB();
        if (db) {
          await db.executeSql(
            `UPDATE TB_SES_LOG SET SES_FLG = ? WHERE SES_COR = ?`,
            [0, usuario]  
          );
          console.log('Flag cambiada a 0 correctamente');
    
          this.logSysService.insertar_log(usuario, ": Flag cambiada a 0 correctamente ", "OK");
    
        } else {
          console.error('La base de datos no está disponible.');
        }
      } catch (error) {
        console.error('Error al actualizar el flag:', error);
      } 
    }
  }
  

  async verificarSesionActiva(): Promise<string | null> {
  const db = this.conexionBDService.getDB();
  if (!db) {
    console.error("Base de datos no disponible.");
    return null;
  }

  try {
    const resultado = await db.executeSql(`SELECT SES_COR, SES_TIM FROM TB_SES_LOG WHERE SES_FLG = 1`);
    console.log("Resultado de la consulta:", resultado);

    if (resultado.rows.length > 0) {
      const sesionUsuario = resultado.rows.item(0);
      console.log("Usuario activo encontrado:", sesionUsuario.SES_COR);
      return sesionUsuario.SES_COR; 
    } else {
      console.log("No hay sesión activa con SES_FLG = 1 en TB_SES_LOG.");
    }
  } catch (error) {
    console.error("Error al verificar la sesión activa:", error);
  }

  console.log("Retornando null por defecto.");
  return null;
}

}

