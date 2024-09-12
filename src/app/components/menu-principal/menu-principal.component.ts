import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent  implements OnInit {
  usuarioNombre: string = ''; 
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.obtenerUsuarioLogueado(); 
  }

  obtenerUsuarioLogueado() {
    const usuarioLogueado = this.sharedDataService.getUsuarioLogueado();
    if (usuarioLogueado) {
      this.usuarioNombre = usuarioLogueado; 
    } else {
      this.usuarioNombre = 'Invitado'; 
    }
  }
  goLogin(){
    this.menuCtrl.close('main-content');
    this.router.navigate(['login']); 
}

  goFolder(){
    this.menuCtrl.close('main-content');
    this.router.navigate(['folder']);
}
  
}
