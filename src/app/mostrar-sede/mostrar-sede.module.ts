import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarSedePageRoutingModule } from './mostrar-sede-routing.module';

import { MostrarSedePage } from './mostrar-sede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarSedePageRoutingModule
  ],
  declarations: [MostrarSedePage]
})
export class MostrarSedePageModule {}
