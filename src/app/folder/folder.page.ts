import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuarioNombre: string = 'Usuario';  // Nombre del usuario
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  abrirSubMenu() {
    // Aquí puedes manejar la apertura de un submenú
    console.log('Submenú abierto');
  }

  irAlPerfil() {
    // Navega a la página de perfil
    this.navCtrl.navigateForward('/perfil');
  }
}