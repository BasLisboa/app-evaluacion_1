//*******************************************************************************/
//*                                   SecGar                                    */
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
//*******************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    private sharedDataService: SharedDataService
  ) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  ingresar() {
    const usuarioIngresado = this.cli_usr;
    const claveIngresada = this.cli_psw;

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
  }
  // FIN-BAS01

  cambio_psw() {
    this.router.navigate(['cambio-psw']);
  }

  registrar_usu() {
    this.router.navigate(['registro']);
  }
}
