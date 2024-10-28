//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: Conexion a la base de datos                                       */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 16-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 16-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/


import { Injectable } from '@angular/core';
import { ConexionBDService } from './conexion-bd.service';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class CreacionDBService {

  constructor(private conexionBDService: ConexionBDService) {
    this.inicializarBD(); 
  }

  async inicializarBD() {
    try {
      await this.conexionBDService.abrirDB(); 
      const database = this.conexionBDService.getDB();

      if (database) {
        await this.createTables(database); 
      } else {
        console.error('La base de datos no está disponible.');
      }
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Método para crear tablas
  async createTables(database: SQLiteObject) {
    try {

      console.log('Creando tabla TB_USUARIOS...');
      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_USUARIOS (
          USR_ID INTEGER PRIMARY KEY AUTOINCREMENT,  
          USR_CORREO VARCHAR(100) UNIQUE,
          USR_PSW VARCHAR(100) NOT NULL,
          USR_NOM VARCHAR(100) NOT NULL,
          USR_APE VARCHAR(100) NOT NULL,
          USR_CAR VARCHAR(100) NOT NULL
        )
      `, []);
      console.log('Tabla TB_USUARIOS creada con éxito.');


      
      console.log('Creando tabla TB_LOG...');

      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_LOG (
          LOG_ID  INTEGER PRIMARY KEY AUTOINCREMENT,
          LOG_COR VARCHAR(100) NOT NULL,
          LOG_HOR VARCHAR(100) NOT NULL,
          LOG_FEC VARCHAR(100) NOT NULL,
          LOG_MSG VARCHAR(100),
          LOG_STS VARCHAR(100)
        )
      `, []);
      console.log('Tabla TB_LOG creada con éxito.');
    
      
     //SES_FLG:  0(no logeado) - 1(logeado)
      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_SES_LOG (
          SES_COR VARCHAR(100) NOT NULL UNIQUE,          
          SES_FLG INTEGER,
          SES_TIM VARCHAR 
        )
      `, []);
      console.log('Tabla TB_SES_LOG creada con éxito.');

      console.log('Todas las tablas fueron creados correctamente.');
    } catch (error) {
      console.error('Error al crear tablas:', error);
    }
  }



  //consultas 
  
  
}
