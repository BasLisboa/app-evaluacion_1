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
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SharedDataService } from '../shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConexionBDService {

  private db: SQLiteObject | null = null;


  constructor(
    private sharedDataService: SharedDataService,
    private sqlite: SQLite
  ) {}

  async abrirDB() {
    this.db = await this.sqlite.create({
      name: "datos.db",
      location: "default"
    });
    console.log("CONEXION OK");
  }

  getDB(): SQLiteObject | null {
    return this.db;
  }
}




