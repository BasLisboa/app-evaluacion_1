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
import { CreacionDBService } from '../services/creacion-db.service';
import { ApiServiceService } from '../services/api-service.service';
import { lastValueFrom } from 'rxjs';
import { LogSysService } from '../services/log-sys.service';
import { SesionActivaService } from '../services/sesion-activa.service';

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
  Alerta_bks: boolean = false;
  Alerta_api_error: boolean = false;
  Alerta_success: boolean = false;
  visibleSpinner: boolean = false;
  res_api_msg: string = '';
  res_api_sts: string = '';

  constructor(
    private sharedDataService: SharedDataService,
    public fb: FormBuilder,
    private router: Router,
    private creacionDBService: CreacionDBService,
    private conexionBDService: ConexionBDService,
    private apiService: ApiServiceService,
    private logSysService: LogSysService,
    private sesionActivaService:SesionActivaService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  //BAS01-INI
  ngOnInit() {
    this.creacionDBService.inicializarBD();

    this.visibleSpinner = false;
  }


  async ApiLogin(correo: string, contrasena: string) {
    try {
      const correoLogin = correo.trim();
      const claveLogin = contrasena.trim();

      if (correoLogin.length > 0 && contrasena.length > 0) {
        console.log("se inicia api login (login.page.ts linea 124)");

        let data = this.apiService.login(correoLogin, claveLogin);
        let respuesta = await lastValueFrom(data);
        console.log(JSON.stringify(respuesta));

        let json_texto = JSON.stringify(respuesta);
        let json = JSON.parse(json_texto);

        if (json.status === 'success') {
          console.log('Usuario logeado correctamente: ', json.status);
          this.Alerta_success = true;
          this.Alerta_api_error = false;
          this.res_api_sts = json.status;
          this.res_api_msg = json.message;
          this.logSysService.insertar_log(this.cli_usr, "Usuario logueado correctamente", json.status);
          this.sesionActivaService.updateFlag(1,correoLogin);
          this.sharedDataService.setUsuarioLogueado(this.cli_usr);
          this.mostrarSpinner();

          this.router.navigate(['folder']);
        } else {
          console.log('Error al loguear: ', json.message, 'status: ', json.status);
          this.Alerta_success = false;
          this.visibleSpinner = false;
          this.Alerta_api_error = true;
          this.res_api_sts = json.status;
          this.res_api_msg = json.message;
          this.logSysService.insertar_log(this.cli_usr, json.message, json.status);
        }
      } else {
        console.log("las variables vienen vacias (login.page.ts linea 124)");
      }
    } catch (error) {
      console.log('error al conectar con api: ', JSON.stringify(error));
      console.error(error);
    }
  }

  //SE COMENTA LOGICA ANTERIOR Y SE AGREGA NUEVA LOGICA
  ingresar() {
    const usuarioIngresado = this.cli_usr.trim();
    const claveIngresada = this.cli_psw.trim(); 
    // SE COMIENZA LOGICA NUEVA
    try {
      if (usuarioIngresado.length > 0 && claveIngresada.length > 0) {
        this.Alerta_error = false;
        this.Alerta_bks = false;  
        console.log('usuario: ', usuarioIngresado, 'contraseña: ', claveIngresada);
        this.ApiLogin(usuarioIngresado, claveIngresada);
      } else {
        this.Alerta_error = true;
        this.Alerta_bks = true;
        console.log('api no iniciada: login.page.ts(lin 88)');
      }
    } catch (error) {
      console.error(error);
    } 

    /* LOGICA ANTIGUA */
    /*  
    // Obtener los arrays desde el servicio angular, aqui se consumen desde el servicio shared-data.service.ts
    const usuarios = this.sharedDataService.getUsuarios();
    const contrasenas = this.sharedDataService.getContrasenas();  
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

  // BAS-BAS02-FIN

  mostrarSpinner() {
    this.visibleSpinner = true;
    setTimeout(() => {
      this.visibleSpinner = false;
    }, 3000);
  }

  cambio_psw() {
    this.router.navigate(['cambio-psw']);
  }

  registrar_usu() {
    this.router.navigate(['registro']);
  }

  getUsr() {
    return this.cli_usr;
  }
}
