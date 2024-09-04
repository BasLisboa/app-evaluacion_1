//*******************************************************************************/
//*                                   SecGar                                    */
//*******************************************************************************/
//* Proyecto: Cambio psw movil                                                  */
//* Desarrollador: Bastian Lisboa (BAS)                                         */
//* Fecha: 03-09-2024                                                           */
//*******************************************************************************/
//* MODIFICACIONES                                                              */
//*******************************************************************************/
//* Desarrollador: Bastian Lisboa                                               */
//* Fecha: 03-09-2024                                                           */
//* Descripcion: Creacion de Cambio password                                    */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';  

@Component({
  selector: 'app-cambio-psw',
  templateUrl: './cambio-psw.page.html',
  styleUrls: ['./cambio-psw.page.scss'],
})
export class CambioPswPage implements OnInit {
  isLoading: boolean = false; 
  formularioCamPsw: FormGroup;
  cli_usr_psw: string = '';
  cli_psw1: string = '';
  cli_psw2: string = '';
  cli_psw3: string = '';
  Alerta_error_usu: boolean = false;
  Alerta_error_psw: boolean = false;
  Alerta_error_psw1: boolean = false;
  Alerta_error_psw2: boolean = false;
  Alerta_error_psw3: boolean = false;
  Alerta_error_null: boolean = false;
  Alerta_cambio_ok: boolean = false;
  flag_psw: boolean = false;
  flag_val_psw: boolean = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService 
  ) {
    this.formularioCamPsw = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password1': new FormControl("", Validators.required),
      'password2': new FormControl("", Validators.required),
      'password3': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    
  }

  Cambiar() {
    const usuarioIngresado1 = this.cli_usr_psw;
    const claveIngresada1 = this.cli_psw1;

    // Obtener los arrays desde el servicio
    const usuarios = this.sharedDataService.getUsuarios();
    const contrasenas = this.sharedDataService.getContrasenas();

    const indiceUsuario = usuarios.indexOf(usuarioIngresado1);
    const flag_psw = this.flag_psw;

    if (indiceUsuario !== -1) { 
      const claveCorrespondiente = contrasenas[indiceUsuario];
      if (claveIngresada1 === claveCorrespondiente) {
        this.flag_val_psw = true;
        this.Alerta_error_usu = false;
        this.Alerta_error_psw = false;
        this.Validacion_contraseña();
        if (flag_psw === true){
          this.sharedDataService.updateContrasena(indiceUsuario, this.cli_psw2);
          this.Alerta_cambio_ok = true;
          this.goLogin_ok();
        } 
      } else {
        this.Alerta_error_psw = true; 
      }
    } else {
      this.Alerta_error_usu = true;  
    }
  }


  Validacion_contraseña(){
    const claveIngresada2 = this.cli_psw2;
    const claveIngresada3 = this.cli_psw3;
    const flag_val = this.flag_val_psw;
    const contieneMayuscula = /[A-Z]/.test(claveIngresada2);
    const contieneMayuscula2 = /[A-Z]/.test(claveIngresada3);

    if (flag_val == true){

      this.flag_psw = false;

      //VALIDA BLANCO
      if(claveIngresada2.length > 0 && claveIngresada3.length > 0){

        //VALIDA LARGO MINIMO
        if (claveIngresada2.length >= 3 && claveIngresada3.length >= 3) {
          this.flag_psw = true;
          this.Alerta_error_psw3 = false;
        } else {
          this.Alerta_error_psw3 = true;
          this.flag_psw = false;
        }
  
        //VALIDA IGUALDAD CLAVES NUEVAS
        if (claveIngresada2 === claveIngresada3){
          this.flag_psw = true;
          this.Alerta_error_psw2 = false;
        } else {
          this.flag_psw = false;
          this.Alerta_error_psw2 = true;
        }
  
        //VALIDA QUE CONTENGA MAYUSCULA
        if (!contieneMayuscula && !contieneMayuscula2) {
          this.flag_psw = false;
          this.Alerta_error_psw1 = true;
        } else {
          this.flag_psw = true;
          this.Alerta_error_psw1 = false;
        }
      } else {
        this.Alerta_error_null = true;
      }
    }
  }  


  goLogin_ok(){
    this.Alerta_error_psw1 = false;
    this.Alerta_error_psw2 = false;
    this.Alerta_error_psw3 = false;
    this.Alerta_error_psw = false;
    this.Alerta_error_null = false;
    this.Alerta_error_usu = false;
    this.flag_val_psw = false;

    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['login']);
      this.Alerta_cambio_ok = false;
    }, 2500)
  }

  goLogin(){
    this.router.navigate(['login']);
  }
}
