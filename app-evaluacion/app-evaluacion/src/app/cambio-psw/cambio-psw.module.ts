import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioPswPageRoutingModule } from './cambio-psw-routing.module';

import { CambioPswPage } from './cambio-psw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioPswPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CambioPswPage]
})
export class CambioPswPageModule {}
