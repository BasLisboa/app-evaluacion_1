//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Cambio password WEB movil                                         */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 11-09-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 11-09-2024                                                           */
//* Descripcion: Creacion de WEB                                                */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  flag_validaciones: boolean = false; 
  Alerta_err_reg: boolean = false;
  Alerta_ok_reg: boolean = false;
  Alerta_err_bks: boolean = false;
  Alerta_lar_usu: boolean = false;
  Alerta_psw_val: boolean = false;
  visibleSpinner: boolean = false;
  cli_usr_reg: string = '';
  cli_psw1_reg: string = '';
  cli_psw2_reg: string = '';
  isLoading_reg: boolean = false;   

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre_reg: new FormControl("", Validators.required),
      password1_reg: new FormControl("", Validators.required),
      password2_reg: new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}


  goLogin_reg(){
    this.router.navigate(['login']);
  }

  Registrar() {
    this.ValidacionesRegistrar();
    
    if (!this.flag_validaciones) {
      const NombreUsuario = this.formularioRegistro.get('nombre_reg')?.value;
      const password1 = this.formularioRegistro.get('password1_reg')?.value;
      
      this.sharedDataService.addUsuario(NombreUsuario);
      this.sharedDataService.addContrasena(password1);
      this.Alerta_err_reg = false;
      this.Alerta_ok_reg = true;
      this.goLogin_reg();
    } else {
      this.Alerta_err_reg = true;
      this.Alerta_ok_reg = false;
    }
  }

  ValidacionesRegistrar() {
    const nombreVal = this.formularioRegistro.get('nombre_reg')?.value;
    const password1_val = this.formularioRegistro.get('password1_reg')?.value;
    const password2_val = this.formularioRegistro.get('password2_reg')?.value;
    const contieneMayuscula = /[A-Z]/.test(password1_val);

    //alertas
    this.flag_validaciones = false;
    this.Alerta_err_bks = false;
    this.Alerta_lar_usu = false;
    this.Alerta_psw_val = false;

    // Validar campos vacíos
    if (!nombreVal || !password1_val || !password2_val) {
      this.Alerta_err_bks = true;
      this.flag_validaciones = true;
      return; 
    }

    // Validar largo del nombre de usuario
    if (nombreVal.length < 3) {
      this.Alerta_lar_usu = true;
      this.flag_validaciones = true;
    }

    // Validar igualdad de contraseñas
    if (password1_val !== password2_val) {
      this.Alerta_psw_val = true;
      this.flag_validaciones = true;
    }

    // Validar que la contraseña contenga al menos una mayúscula
    if (!contieneMayuscula) {
      this.Alerta_psw_val = true;
      this.flag_validaciones = true;
    }
  }
}