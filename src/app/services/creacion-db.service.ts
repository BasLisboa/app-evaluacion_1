//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: Conexion a la base de datos                                       */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 06-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 06-10-2024                                                           */
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

  private async inicializarBD() {
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
  private async createTables(database: SQLiteObject) {
    try {
      console.log('Creando tabla TB_USUARIOS...');
      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_USUARIOS (
          USR_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          USR_RUT VARCHAR(15) NOT NULL UNIQUE,
          USR_USER VARCHAR(15) NOT NULL,
          USR_PSW VARCHAR(30) NOT NULL
        )
      `, []);
      console.log('Tabla TB_USUARIOS creada con éxito.');

      console.log('Creando tabla TB_ASIGNATURAS...');
      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_ASIGNATURAS (
          ASG_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          ASG_NOMBRE VARCHAR(50) NOT NULL UNIQUE
        )
      `, []);
      console.log('Tabla TB_ASIGNATURAS creada con éxito.');

      console.log('Creando tabla TB_ASISTENCIA...');
      await database.executeSql(`
        CREATE TABLE IF NOT EXISTS TB_ASISTENCIA (
          AST_ID INTEGER PRIMARY KEY AUTOINCREMENT,
          USR_ID INTEGER NOT NULL,
          ASG_ID INTEGER NOT NULL,
          AST_FECHA DATE NOT NULL,
          AST_ESTADO VARCHAR(10) NOT NULL,
          FOREIGN KEY (USR_ID) REFERENCES TB_USUARIOS(USR_ID) ON DELETE CASCADE,
          FOREIGN KEY (ASG_ID) REFERENCES TB_ASIGNATURAS(ASG_ID) ON DELETE CASCADE
        )
      `, []);
      console.log('Tabla TB_ASISTENCIA creada con éxito.');

      console.log('Creando índice IDX_USUARIOS_RUT...');
      await database.executeSql(`
        CREATE INDEX IF NOT EXISTS IDX_USUARIOS_RUT ON TB_USUARIOS(USR_RUT)
      `, []);
      console.log('Índice IDX_USUARIOS_RUT creado con éxito.');

      console.log('Todas las tablas y el índice fueron creados correctamente.');
    } catch (error) {
      console.error('Error al crear tablas o índices:', error);
    }
  }
}
