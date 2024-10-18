//*******************************************************************************/
//*                                   Duoc                                      */
//*******************************************************************************/
//* Proyecto: Login movil                                                       */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 30-08-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 30-08-2024                                                           */
//* Descripcion: Creacion de login                                              */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 31-08-2024                                                           */
//* Descripcion: Modificacion a logica login (BAS01)                            */
//*-----------------------------------------------------------------------------*/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 18-10-2024                                                           */
//* Descripcion: Se incluye base de datos a login (BAS02)                       */
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConexionBDService } from '../services/conexion-bd.service';
import { ApiServiceService } from '../services/api-service.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  cli_usr: string = '';
  cli_psw: string = '';
  Alerta_error: boolean = false;
  visibleSpinner: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService,
    private conexionBDService: ConexionBDService,
    private apiService: ApiServiceService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.conexionBDService.abrirDB();
  }

  //BAS-BAS02-INI

  //SE COMENTA LOGICA ANTERIOR Y SE AGREGA NUEVA LOGICA
 
  ingresar() {
    const usuarioIngresado = this.cli_usr;
    const claveIngresada = this.cli_psw;

    // Obtener los arrays desde el servicio angular, aqui se consumen desde el servicio shared-data.service.ts
    const usuarios = this.sharedDataService.getUsuarios();
    const contrasenas = this.sharedDataService.getContrasenas();
    

    // SE COMIENZA LOGICA NUEVA
    if (usuarioIngresado.length > 0 && claveIngresada.length > 0) {
      this.Alerta_error = false;
      
      this.ApiLogin(usuarioIngresado,claveIngresada)
    }
    else{
      this.Alerta_error = true;
    }




    /* LOGICA ANTIGUA */
    /*
    const indiceUsuario = usuarios.indexOf(usuarioIngresado);
    
    // Validaciones para clave y usuario INI-BAS01
    if (usuarioIngresado.length > 0 && claveIngresada.length > 0) {
      this.Alerta_error = false;

      if (indiceUsuario !== -1) { 
        const claveCorrespondiente = contrasenas[indiceUsuario];
        if (claveIngresada === claveCorrespondiente) {
          this.Alerta_error = false;

          this.sharedDataService.setUsuarioLogueado(usuarioIngresado);

          this.router.navigate(['folder']);
        } else {
          this.Alerta_error = true;
        }
      } else {
        this.Alerta_error = true;
      }

    } else {
      this.Alerta_error = true;
    }
    // FIN-BAS01
    */


  }

  async ApiLogin(usuario: string, clave: string){
    try{

      const correoLogin = usuario.trim();
      const claveLogin = clave.trim();
      const datosLogin = "";

      if(correoLogin.length > 0 && clave.length > 0){
        console.log("se inicia api login (login.page.ts linea 124)")
        let data = this.apiService.login(correoLogin,claveLogin);
        let respuesta = await lastValueFrom(data);
        console.log(respuesta);
      }else{
        console.log("las variables vienen vacias (login.page.ts linea 124)")
      }

    }catch(error){

    }
  }

  // BAS-BAS02-FIN
  cambio_psw() {
    this.router.navigate(['cambio-psw']);
  }

  registrar_usu() {
    this.router.navigate(['registro']);
  }
}
