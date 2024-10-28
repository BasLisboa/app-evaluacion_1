import { Injectable } from '@angular/core';
import { ConexionBDService } from './conexion-bd.service';


@Injectable({
  providedIn: 'root'
})
export class LogSysService {

  constructor(private conexionBDService: ConexionBDService) { }


  async insertar_log(correo: string, mensaje: string, status: string) {
    
    const sysdate = new Date(); 

    const options = { timeZone: 'America/Santiago', hour12: false };
    const fecha = sysdate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }); //dd/mm/yyyy
    const hora = sysdate.toLocaleTimeString('es-CL', options);  //hh:mm:ss

    try {
      const db = this.conexionBDService.getDB();
      if (db) {
        await db.executeSql(
          `INSERT INTO TB_LOG(LOG_COR, LOG_HOR, LOG_FEC, LOG_MSG, LOG_STS) VALUES (?, ?, ?, ?, ?)`,
          [correo, hora, fecha, mensaje, status]
        );
        console.log('Log insertado correctamente en TB_LOG.');
        this.obtener_logs()
        .then(logs => {
          console.log('Logs obtenidos:', JSON.stringify(logs, null, 2)); 
        })
        .catch(error => {
          console.error('Error al obtener logs:', JSON.stringify(error));
        });
      

      } else {
        console.error('La base de datos no está disponible.');
      }
    } catch (error) {
      console.error('Error al insertar log: ', JSON.stringify(error));
    }    
  }




  obtener_logs(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const db = this.conexionBDService.getDB();
  
      if (db) {
        db.executeSql('SELECT * FROM TB_LOG', [])
          .then((result) => {
            const logs = [];
            for (let i = 0; i < result.rows.length; i++) {
              logs.push(result.rows.item(i));
            }
            resolve(logs);  
          })
          .catch((error) => {
            console.error('Error al obtener logs:', error);
            reject(error);  
          });
      } else {
        console.error('La base de datos no está disponible.');
        reject('La base de datos no está disponible.'); 
      }
    });
  }

}



