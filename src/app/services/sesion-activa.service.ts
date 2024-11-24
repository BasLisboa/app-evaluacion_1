//*******************************************************************************/
//*                                   Duoc                                      */
//*******************************************************************************/
//* Proyecto: servicio de sesiones activas                                      */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 28-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 28-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*******************************************************************************/
import { Injectable } from '@angular/core';
import { ConexionBDService } from '../services/conexion-bd.service';
import { LogSysService } from '../services/log-sys.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionActivaService {

  constructor(
    private conexionBDService: ConexionBDService,
    private logSysService: LogSysService,
    private router: Router
  ) { }


  async updateFlag(opcion: number, usuario: string){
    console.log("Entro a updateFlag");
    
    if(opcion == 1){
      const db = this.conexionBDService.getDB();
      
      if (db) {
        try{
          const sysdate = new Date(); 

          const options = { timeZone: 'America/Santiago', hour12: false };
          const fecha = sysdate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }); //dd/mm/yyyy
          const hora = sysdate.toLocaleTimeString('es-CL', options);  //hh:mm:ss
          const fechaHoraLocal = `${fecha} ${hora}`;
          
          await db.executeSql(`INSERT INTO TB_SES_LOG (SES_COR, SES_FLG, SES_TIM) VALUES (?, ?, ?)`, [usuario, 1, fechaHoraLocal]);

          console.log('Flag insertada');
          this.logSysService.insertar_log(usuario, ": Flag insertada ", "OK");
        }catch(error){
          console.error('Error al actualizar el flag:', JSON.stringify(error));
        }
      } else {
        console.error('La base de datos no está disponible.');
      }
    }else if(opcion == 0){

       const db = this.conexionBDService.getDB();

       if (db) {
         try{
           await db.executeSql(
             `DELETE FROM TB_SES_LOG`  
           );

           this.logSysService.insertar_log(usuario, ": Flags elimiandas correctamente ", "OK");

         }catch(error){
           console.error("error: ", error);
           this.logSysService.insertar_log(usuario, "Error al cambiar flag", "ERROR");      
         }
       } else {
         console.error('La base de datos no está disponible.');
       }
    }
  }
  

  async verificarSesionActiva(): Promise<boolean> {
    const db = this.conexionBDService.getDB();
    if (!db) {
      console.error("Base de datos no disponible.");
      return false;
    }
  
    try {
      const resultado = await db.executeSql(`SELECT SES_COR, SES_TIM FROM TB_SES_LOG WHERE SES_FLG = 1`, []);
      if (resultado.rows.length > 0 ) {
        const sesionUsuario = resultado.rows.item(0);
        console.log("Usuario activo encontrado:", sesionUsuario.SES_COR);
        return true; 
      } else {
        console.log("No hay sesión activa con SES_FLG = 1 en TB_SES_LOG.");
        return false;
      }
    } catch (error: any) {
      console.error("Error al verificar la sesión activa:", error.message || error);
      return false;
    }
  }
  
  

}

