import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {

  usuarioNombre: string = 'Usuario';  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  abrirSubMenu() {
    console.log('Submenú abierto');
  }

  irAlPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }
}