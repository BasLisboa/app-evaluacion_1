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

  Registrar(){
    const NombreUsuario = this.cli_usr_reg;
    const password1 = this.cli_psw1_reg;

    this.ValidacionesRegistrar();
    if (this.flag_validaciones == false){
      this.sharedDataService.addUsuario(NombreUsuario);
      this.sharedDataService.addContrasena(password1);
      this.Alerta_err_reg = false;
      this.Alerta_ok_reg = true;
      this.goLogin_reg();
    }
    else{
      this.Alerta_err_reg = true;
      this.Alerta_ok_reg = false;
    }
  }

  ValidacionesRegistrar(){
    const NombreVal = this.cli_usr_reg;
    const password1_val = this.cli_psw1_reg;
    const password2_val = this.cli_psw2_reg;
    const contieneMayuscula = /[A-Z]/.test(password1_val);
    const contieneMayuscula2 = /[A-Z]/.test(password2_val);
    
    this.flag_validaciones = false;
    if (NombreVal.length == 0 && password1_val.length == 0 && password2_val.length == 0){
      this.Alerta_err_bks = true;
      this.flag_validaciones = true;
    }
    else {
      //VALIDA LARGO MINIMO USUARIO
      if(NombreVal.length > 0 && NombreVal.length < 3){
        this.Alerta_lar_usu = true;
        this.flag_validaciones = true;
      } else {
        this.Alerta_lar_usu = false;
        this.flag_validaciones = false;
      }

      //VALIDA IGUALDAD CLAVES 
      if (password1_val != password2_val){
        this.Alerta_psw_val = true;
        this.flag_validaciones = true;
      } else{
        this.Alerta_psw_val = false;
        this.flag_validaciones = false;
      }

      //VALIDA QUE CONTENGA MAYUSCULA
      if (!contieneMayuscula && !contieneMayuscula2) {
        this.Alerta_psw_val = true;
        this.flag_validaciones = true;
      } else {
        this.Alerta_psw_val = false;
        this.flag_validaciones = false;
      }
    }
  }
}