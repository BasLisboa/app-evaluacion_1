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
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuarios: string[] = ['BAS', 'DAN', 'ADM'];
  contraseñas: string[] = ['123', '456', '789'];
  cli_usr: string = '';
  cli_psw: string = '';
  Alerta_error: boolean = false;
  visibleSpinner: boolean = false;

  constructor(public fb: FormBuilder,private router: Router) {

    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }


  ingresar(){
    const usuarioIngresado = this.cli_usr;
    const claveIngresada = this.cli_psw;

    const indiceUsuario = this.usuarios.indexOf(usuarioIngresado);
    
    //Validaciones para clave y contraseña INI-BAS01
    if (indiceUsuario !== -1) { 
      const claveCorrespondiente = this.contraseñas[indiceUsuario];
      if (claveIngresada === claveCorrespondiente) {
        this.Alerta_error = false;
        this.router.navigate(['folder']);
      } else {
        this.Alerta_error = true;
      }
    } else {
      this.Alerta_error = true;
    }
  }
  //FIN-BAS01

}
