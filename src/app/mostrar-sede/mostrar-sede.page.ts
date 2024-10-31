//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: Mostrar sedes                                                     */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 23-10-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 23-10-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { lastValueFrom } from 'rxjs';
import { LogSysService } from '../services/log-sys.service';
import { SharedDataService } from '../shared-data.service'; 

@Component({
  selector: 'app-mostrar-sede',
  templateUrl: './mostrar-sede.page.html',
  styleUrls: ['./mostrar-sede.page.scss'],
})
export class MostrarSedePage implements OnInit {

  listaSede: any[] = [];

  constructor(
    private apiServiceService: ApiServiceService, 
    private logSysService: LogSysService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.obtenerSede();
  }
  

  async obtenerSede() {
    try {
      let sede = this.apiServiceService.obtenerSede();  
      let respuesta = await lastValueFrom(sede); 

      console.log('Respuesta:', JSON.stringify(respuesta)); 
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);


      if (Array.isArray(respuesta) && respuesta.length > 0 && Array.isArray(respuesta[0])) {
        const listaSedes = respuesta[0];  
  
        this.listaSede = [];
  
        for (let sede of listaSedes) {
          this.listaSede.push({
            nombre: sede.NOMBRE,
            direccion: sede.DIRECCION,
            telefono: sede.TELEFONO,
            horarioAtencion: sede.HORARIO_ATENCION,
            imagen: sede.IMAGEN
          });
        };

        const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
        console.log('Lista de sedes:', this.listaSede);
        this.logSysService.insertar_log(usuarioLogueado,"Api devolvio correctamente las sedes " ,"OK" );
      } else {
        console.error('La respuesta no contiene datos válidos o está vacía.', respuesta);
      }
  
    } catch (error) {
      console.error('Error al obtener las sedes', JSON.stringify(error, null, 2));
      const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
      this.logSysService.insertar_log(usuarioLogueado,"Error al obtener las sedes " ,"ERROR" );
    }
  }


}
