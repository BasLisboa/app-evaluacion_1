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
import { LogSysService } from '../services/log-sys.service';
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
  Alerta_ok_reg: boolean = false;
  Alerta_err: boolean = false;


  //carga
  visibleSpinner: boolean = false;

  //Variables globales
  cli_usr_reg: string = '';
  cli_psw_reg: string = '';
  cli_nombre_reg: string = '';
  cli_apellido_reg: string = '';
  cli_carrera_reg: string = '';
  isLoading_reg: boolean = false;  
  api_msj: string = '';
  api_sts: string = ''; 

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private conexionBDService: ConexionBDService,
    private logSysService: LogSysService,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {

    this.conexionBDService.abrirDB();

    this.Alerta_err = false; 
    this.flag_validaciones = false;
    this.Alerta_err_bks = false;
  }

  //validaciones 
  ValidacionesRegistrar() {
    
    //alertas
    this.Alerta_err_bks = false;
    this.flag_validaciones = false;


    // Validar campos vacíos
    if (this.cli_usr_reg.length > 0 && this.cli_psw_reg.length > 0 && this.cli_nombre_reg.length > 0 && this.cli_apellido_reg.length > 0 && this.cli_carrera_reg.length > 0) {
      
      //FLAGS
      this.Alerta_err_bks = false;
      this.flag_validaciones = true;
      console.log('datos ok');
    } 
    else{
      console.log('datos en blanco');
      this.Alerta_err_bks = true;
      this.flag_validaciones = false;
    }
  }



  async ApiRegistrar(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    try {

      let datos = this.apiService.crearUsuario(correo,contrasena,nombre,apellido,carrera);
      let respuesta = await lastValueFrom(datos); 

      let json_texto = JSON.stringify(respuesta); 
      let json = JSON.parse(json_texto);

    
      console.log('Respuesta:', json.status);
      console.log('usuario: ', this.cli_usr_reg);
      console.log('contraseña: ', this.cli_psw_reg);
      console.log('nombre: ', this.cli_nombre_reg);
      console.log('apellido: ', this.cli_apellido_reg);
      console.log('carrera: ', this.cli_carrera_reg);


      if (json.status === 'success') {
        
        console.log('Usuario registrado exitosamente en api:', json.message, ' STATUS: ' , json.status);
        this.api_msj = json.message;
        this.api_sts = json.status;

        this.Alerta_err = false; 
        this.Alerta_ok_reg = true;  

        this.logSysService.insertar_log(this.cli_usr_reg, json.message, json.status );

        this.goLogin_reg();  

      } else {
        console.error('Error al registrar usuario en api:', json.message,' STATUS: ' , json.status);
        this.Alerta_err = true;
        this.Alerta_ok_reg = false;  
        this.api_msj = json.message;
        this.api_sts = json.status;
        this.logSysService.insertar_log(this.cli_usr_reg, json.message, json.status );

      }

    } catch (error) {
      console.error('Error en la llamada a la API:', error);
      this.Alerta_err_bks = true; 
      this.Alerta_err = true;  
    }
  }

  async insertarUsuario(correo: string, contrasena: string, nombre: string, apellido: string, carrera: string) {
    try {
      const db = this.conexionBDService.getDB();
      if (db) {
        await db.executeSql(
          `INSERT INTO TB_USUARIOS (USR_CORREO, USR_PSW, USR_NOM, USR_APE, USR_CAR) VALUES (?, ?, ?, ?, ?)`,
          [correo, contrasena, nombre, apellido, carrera]
        );

        const sysdate = new Date(); 

        const options = { timeZone: 'America/Santiago', hour12: false };
        const fecha = sysdate.toLocaleDateString('es-CL', { timeZone: 'America/Santiago' }); //dd/mm/yyyy
        const hora = sysdate.toLocaleTimeString('es-CL', options);  //hh:mm:ss
        const fechaHoraLocal = `${fecha} ${hora}`;
        await db.executeSql(
          `INSERT INTO TB_SES_LOG (SES_COR, SES_FLG, SES_TIM) VALUES (?, ?, ?)`,
          [this.cli_usr_reg, 0, fechaHoraLocal]
        );

        console.log('Usuario insertado correctamente en TB_USUARIOS. y TB_SES_LOG');
        this.logSysService.insertar_log(this.cli_usr_reg, this.api_msj, this.api_sts );

      } else {
        console.error('La base de datos no está disponible.');
        this.Alerta_err = false;
      }
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      this.Alerta_err = false;
    }
  }


  obtenerUsuarios(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const db = this.conexionBDService.getDB();  

      if (db) {
        db.executeSql('SELECT * FROM TB_USUARIOS', [])
          .then((result) => {
            let usuarios = [];
            for (let i = 0; i < result.rows.length; i++) {
              usuarios.push(result.rows.item(i));  
            }
            resolve(usuarios);  
          })
          .catch((error) => {
            console.error('Error al consultar usuarios:', error);
            reject(error);
          });
      } else {
        console.error('La base de datos no está disponible.');
        reject('La base de datos no está disponible.');  
      }
    });
  }



  goLogin_reg(){
    this.router.navigate(['login']);
  }


  //funcion principal
  Registrar() {

    try{
      this.ApiRegistrar(this.cli_usr_reg,this.cli_psw_reg,this.cli_nombre_reg,this.cli_apellido_reg,this.cli_carrera_reg);
      
      this.ValidacionesRegistrar();
      
      if(this.Alerta_err == false && this.flag_validaciones == true){
        this.insertarUsuario(this.cli_usr_reg,this.cli_psw_reg,this.cli_nombre_reg,this.cli_apellido_reg,this.cli_carrera_reg);

        this.obtenerUsuarios()
        .then(usuarios => {
          console.log('Usuarios obtenidos:', JSON.stringify(usuarios, null, 2));
        })
        .catch(error => {
          console.error('Error al obtener usuarios:', JSON.stringify(error));
        });
      }  

      //BAS01-INI SE QUITA LA LOGICA ANTIGUA
      /*this.sharedDataService.addUsuario(NombreUsuario);
      this.sharedDataService.addContrasena(password1);*/
      //BAS01-FIN

    }catch(error){
      console.log('error al registrar');
      
    }
  }
}