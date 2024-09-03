import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

<<<<<<< Updated upstream
=======
  ngOnInit() {}

  ingresar() {
    const usuarioIngresado = this.cli_usr;
    const claveIngresada = this.cli_psw;

    // Obtener los arrays desde el servicio angular, aqui se consumen desde el servicio shared-data.service.ts
    const usuarios = this.sharedDataService.getUsuarios();
    const contrasenas = this.sharedDataService.getContrasenas();

    const indiceUsuario = usuarios.indexOf(usuarioIngresado);

    // Validaciones para clave y usuario INI-BAS01
    if (usuarioIngresado.length > 0 || claveIngresada.length > 0){
      this.Alerta_error = false;
    } else{
      this.Alerta_error = true;
    }

    if (indiceUsuario !== -1) { 
      const claveCorrespondiente = contrasenas[indiceUsuario];
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
  // FIN-BAS01

  cambio_psw() {
    this.router.navigate(['cambio-psw']);
  }
>>>>>>> Stashed changes
}
