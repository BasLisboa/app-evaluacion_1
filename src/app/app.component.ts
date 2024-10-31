import { Component, OnInit } from '@angular/core';
import { SesionActivaService } from './services/sesion-activa.service';
import { CreacionDBService } from '../app/services/creacion-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private sesionActivaService: SesionActivaService,
    private creacionDBService: CreacionDBService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.creacionDBService.inicializarBD();
    
    const usuarioActivo = await this.sesionActivaService.verificarSesionActiva();
    if (usuarioActivo) {
      this.router.navigate(['folder']); 
    } else {
      this.router.navigate(['login']); 
    }
  }
}
