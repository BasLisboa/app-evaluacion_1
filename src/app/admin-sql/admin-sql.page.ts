//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: admin board                                                       */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 21-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 21-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ConexionBDService } from '../services/conexion-bd.service';

@Component({
  selector: 'app-admin-sql',
  templateUrl: './admin-sql.page.html',
  styleUrls: ['./admin-sql.page.scss'],
})
export class AdminSqlPage implements OnInit {

  sqlQuery: string = '';  
  resultados: any[] = [];
  headers: string[] = [];

  constructor(private conexionBDService: ConexionBDService) {}
  ngOnInit(){

  }

  async ejecutarQuery() {
    const db = this.conexionBDService.getDB();  
    if (db) {
      try {
        const result = await db.executeSql(this.sqlQuery, []);
        
        this.resultados = [];  
        this.headers = [];  

        if (result.rows.length > 0) {
          this.headers = Object.keys(result.rows.item(0));

          for (let i = 0; i < result.rows.length; i++) {
            const rowItem = result.rows.item(i);
            this.resultados.push(rowItem);
          }
        } else {
          console.log('No se encontraron resultados.');
        }

      } catch (error) {
        console.error('Error al ejecutar la consulta SQL:', error);
      }
    } else {
      console.error('La base de datos no está disponible.');
    }
  }

}
