//*******************************************************************************/
//*                                   DuocQR                                    */
//*******************************************************************************/
//* Proyecto: registro usuario                                                  */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 11-09-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 11-09-2024                                                           */
//* Descripcion: Creacion de servicio                                           */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ConexionBDService } from '../services/conexion-bd.service';
import { ApiServiceService } from '../services/api-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  //flags
  flag_validaciones: boolean = false; 
  Alerta_err_bks: boolean = false;


  //carga
  visibleSpinner: boolean = false;

  //Variables globales
  cli_usr_reg: string = '';
  cli_psw_reg: string = '';
  cli_nombre_reg: string = '';
  cli_apellido_reg: string = '';
  cli_carrera_reg: string = '';
  isLoading_reg: boolean = false;   

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private conexionBDService: ConexionBDService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    this.conexionBDService.abrirDB();
  }


  goLogin_reg(){
    this.router.navigate(['login']);
  }


  
  Registrar() {

    this.flag_validaciones = false;

    this.ValidacionesRegistrar();
    
    if (this.flag_validaciones = true) {

      //BAS01-INI SE QUITA LA LOGICA ANTIGUA
      /*this.sharedDataService.addUsuario(NombreUsuario);
      this.sharedDataService.addContrasena(password1);*/
      //BAS01-FIN

      this.ApiRegistrar(this.cli_usr_reg,this.cli_psw_reg,this.cli_nombre_reg,this.cli_apellido_reg,this.cli_carrera_reg);

      this.goLogin_reg();
    } else {
      this.flag_validaciones = false
    }
  }

  ValidacionesRegistrar() {
    //alertas
    this.flag_validaciones = false;
    this.Alerta_err_bks = false;


    // Validar campos vacíos
    if (!this.cli_usr_reg || !this.cli_psw_reg || !this.cli_nombre_reg || !this.cli_apellido_reg || !this.cli_carrera_reg) {
      this.Alerta_err_bks = true;
      this.flag_validaciones = true;
      return; 
    }
  }

  async ApiRegistrar(mail: string,pass: string,nombre: string,apellido: string,carrera: string){
    let datos = this.apiService.crearUsuario(
                                          mail, 
                                          pass,
                                          nombre,
                                          apellido,
                                          carrera
    );

    let respuesta = await lastValueFrom(datos);
    
    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);
    
    if(json[0].RESPUESTA == 'success') {
      console.log(json[0].RESPUESTA)
      this.goLogin_reg();
    } else {
      console.log("CREDENCIALES INVÁLIDAS");
    }
  }

  
}