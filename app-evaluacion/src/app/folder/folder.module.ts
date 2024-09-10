import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { folderPageRoutingModule } from './folder-routing.module';

import { folderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    folderPageRoutingModule
  ],
  declarations: [folderPage]
})
export class folderPageModule {}
