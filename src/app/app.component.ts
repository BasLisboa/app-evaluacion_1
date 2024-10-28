import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionActivaService } from './services/sesion-activa.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private sesionActivaService: SesionActivaService,
    private router: Router
  ) {}

  async ngOnInit() {
    const usuarioActivo = await this.sesionActivaService.verificarSesionActiva();
    console.log("respuesta usuario activo: ",usuarioActivo);
    
    if (usuarioActivo) {
      this.router.navigate(['folder']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
