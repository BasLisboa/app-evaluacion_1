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
//* Desarrollador: Bastian Lisboa  (bas0q)                                      */
//* Fecha: 26-10-2024                                                           */
//* Descripcion: Cambio de logica para cambiar clave                            */
//*-----------------------------------------------------------------------------*/
//*******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import { ConexionBDService } from '../services/conexion-bd.service';
import { ApiServiceService } from '../services/api-service.service';  
import { lastValueFrom } from 'rxjs';
import { LogSysService } from '../services/log-sys.service';

@Component({
  selector: 'app-cambio-psw',
  templateUrl: './cambio-psw.page.html',
  styleUrls: ['./cambio-psw.page.scss'],
})
export class CambioPswPage implements OnInit {
  
  //spinner
  isLoading: boolean = false; 

  //formulario
  formularioCamPsw: FormGroup;

  //variables generales
  cli_usr: string = '';
  cli_psw1: string = '';
  cli_carr: string = '';

  api_msj: string = '';
  api_sts: string = ''; 

  //flags
  Alerta_error_usu: boolean = false;
  Alerta_error_psw: boolean = false;
  Alerta_cambio_ok: boolean = false;
  flag_psw: boolean = false;
  flag_val: boolean = false;
  Alerta_error_null: boolean = false;
  tip_upd: number = 0;

  //BAS01-INI
  //cli_psw2: string = '';
  //cli_psw3: string = '';
  //Alerta_error_psw2: boolean = false;
  //Alerta_error_psw3: boolean = false;
  //Alerta_error_psw1: boolean = false;
  //BAS01-FIN

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private sharedDataService: SharedDataService,
    private conexionBDService: ConexionBDService,
    private apiServiceService: ApiServiceService,
    private logSysService: LogSysService
  ) {
    this.formularioCamPsw = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password1': new FormControl("", Validators.required),
      'carrera': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    
  }

  Validacion_contraseña(){
    //BAS01-INI

    const usuario = this.cli_usr;
    const clave = this.cli_psw1;
    const carrera = this.cli_carr;


    //validaciones blancos/null
    if(usuario.length > 0){
      this.Alerta_error_usu = false;
      this.flag_val = true;
      /*if(clave.length > 0 && carrera.length > 0){
        console.log("Validaciones");
        
        console.log("usuario: ", usuario);
        console.log("clave: ",clave);
        console.log("carrera: ",carrera);

        console.log('datos ok');
        this.Alerta_error_null = false;  
        this.flag_val = true;
      }else{
        console.log('Datos vacios o nulos');
        this.Alerta_error_null = true;
        this.flag_val = false;
      }*/


    }else{
      console.log('correo es obligatorio');
      this.Alerta_error_usu = true;
      this.flag_val = false;
    }

    //logica antigua
    /*
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
    }*/
   //BAS01-FIN
  }  


  goLogin_ok(){
    //this.Alerta_error_psw1 = false;
    //this.Alerta_error_psw2 = false;
    //this.Alerta_error_psw3 = false;
    //this.Alerta_error_psw = false;
    this.Alerta_error_null = false;
    this.Alerta_error_usu = false;
    //this.flag_val_psw = false;

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

  async apiCambio(correo: string, contrasena: string, carrera: string){
    console.log("Entrando a apiCambio");
    
    console.log("usuario: ", correo);
    console.log("clave: ",contrasena);
    console.log("carrera: ",carrera);

    try{
      let datos_cambio = this.apiServiceService.cambioClave(correo, contrasena, carrera);
      let respuesta = await lastValueFrom(datos_cambio);
      let json_texto = JSON.stringify(respuesta); 
      let json = JSON.parse(json_texto);

      console.log(json_texto);
      console.log(json);


      if (json.status === 'success') {
        console.log('Usuario modificado exitosamente en api:', json.message, ' STATUS: ' , json.status);
        this.api_msj = json.message;
        this.api_sts = json.status;
        this.Alerta_cambio_ok = true;
        this.Alerta_error_null = false;
        this.logSysService.insertar_log(this.cli_usr, json.message, json.status );

        this.goLogin_ok();

      }else{
        console.log('error al modificar usuario en api:', json.message, ' STATUS: ' , json.status);
        this.api_msj = json.message;
        this.api_sts = json.status;
        this.Alerta_cambio_ok = false;
        this.logSysService.insertar_log(this.cli_usr, json.message, json.status );

      }

    }catch(error){
      console.error('Error en la llamada a la API:', JSON.stringify(error));
    }
  }

  async updateCambio(correo: string, contrasena: string, carrera: string){
     
    try{
      const db = this.conexionBDService.getDB();
      
      if(db){
        try{

          await db.executeSql(
            `UPDATE TB_USUARIOS SET USR_PSW = ?, USR_CAR = ? WHERE USR_CORREO = ?`,
            [contrasena , carrera, correo]
          );


          this.logSysService.insertar_log(this.cli_usr, "Update ok", "UPDATEADO" );
        }catch(error){
          this.logSysService.insertar_log(this.cli_usr, "Error al updatear:", "ERROR" );
          console.error(error)
        }
      }
    }catch(error){
      console.error(error);
      console.log("error al ejecutar rutina update");
      
    }

  }

  Cambiar() {
    //BAS01-INI
    this.Validacion_contraseña();

    if(this.flag_val === true){
      this.apiCambio(this.cli_usr,this.cli_psw1,this.cli_carr); 
      
      if(this.Alerta_cambio_ok = true){

        this.updateCambio(this.cli_usr,this.cli_psw1,this.cli_carr);

      }else{
        console.log('Cambios no realizados, se anula UPDATE');
      }

    }else{
      console.log('error, problemas en validacion');
    }


    






    /*const usuarioIngresado1 = this.cli_usr_psw;
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
          //this.sharedDataService.updateContrasena(indiceUsuario, this.cli_psw2);
          this.Alerta_cambio_ok = true;
          this.goLogin_ok();
        } 
      } else {
        this.Alerta_error_psw = true; 
      }
    } else {
      this.Alerta_error_usu = true;  
    }
  */
 //BAS01-FIN
  }
}
